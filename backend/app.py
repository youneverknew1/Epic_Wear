from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

mysql = MySQL(app)
app.extensions['mysql'] = mysql

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.extensions['bcrypt'] = bcrypt

CORS(app, resources={r"/api/*": {"origins": "https://epic-wear-backend.onrender.com"}})

from routes.api import api_bp
from routes.auth import auth_bp

app.register_blueprint(api_bp)
app.register_blueprint(auth_bp)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Backend running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)