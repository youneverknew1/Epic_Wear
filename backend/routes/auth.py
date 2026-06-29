from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        mysql = current_app.extensions['mysql']
        bcrypt = current_app.extensions['bcrypt']
        data = request.json

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({'error': 'All fields required'}), 400

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            cursor.close()
            return jsonify({'error': 'Email already registered'}), 409

        hashed = bcrypt.generate_password_hash(password).decode('utf-8')

        cursor.execute("""
            INSERT INTO users (name, email, password, role)
            VALUES (%s, %s, %s, 'customer')
        """, (name, email, hashed))

        mysql.connection.commit()
        user_id = cursor.lastrowid
        cursor.close()

        token = create_access_token(identity=str(user_id))
        return jsonify({
            'token': token,
            'user': {'id': user_id, 'name': name, 'email': email}
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        mysql = current_app.extensions['mysql']
        bcrypt = current_app.extensions['bcrypt']
        data = request.json

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if not user or not bcrypt.check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid email or password'}), 401

        token = create_access_token(identity=str(user['id']))
        return jsonify({
            'token': token,
            'user': {'id': user['id'], 'name': user['name'], 'email': user['email']}
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    try:
        mysql = current_app.extensions['mysql']
        user_id = get_jwt_identity()
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, name, email, role FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return jsonify(user), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500