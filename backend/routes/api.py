from flask import Blueprint, request, jsonify
from flask import current_app

api_bp = Blueprint('api', __name__, url_prefix='/api')

# ===== PRODUCTS =====
@api_bp.route('/products', methods=['GET'])
def get_products():
    try:
        mysql = current_app.extensions['mysql']
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        cursor.close()
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        mysql = current_app.extensions['mysql']
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
        product = cursor.fetchone()
        cursor.close()
        return jsonify(product) if product else jsonify({'error': 'Not found'}), 200 if product else 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== CATEGORIES =====
@api_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        mysql = current_app.extensions['mysql']
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM categories")
        categories = cursor.fetchall()
        cursor.close()
        return jsonify(categories), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== CART =====
@api_bp.route('/cart', methods=['POST'])
def add_to_cart():
    try:
        mysql = current_app.extensions['mysql']
        data = request.json
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        if not user_id or not product_id:
            return jsonify({'error': 'Missing user_id or product_id'}), 400
        
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO cart (user_id, product_id, quantity) VALUES (%s, %s, %s)", 
                      (user_id, product_id, quantity))
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({'message': 'Added to cart', 'product_id': product_id, 'quantity': quantity}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    try:
        mysql = current_app.extensions['mysql']
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = %s
        """, (user_id,))
        items = cursor.fetchall()
        cursor.close()
        
        total = sum(item['price'] * item['quantity'] for item in items) if items else 0
        return jsonify({'items': items, 'total': total, 'count': len(items)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== ORDERS =====
@api_bp.route('/orders', methods=['POST'])
def create_order():
    try:
        mysql = current_app.extensions['mysql']
        data = request.json
        user_id = data.get('user_id')
        delivery_address = data.get('delivery_address')
        payment_method = data.get('payment_method', 'COD')
        
        if not user_id or not delivery_address:
            return jsonify({'error': 'Missing user_id or delivery_address'}), 400
        
        cursor = mysql.connection.cursor()
        
        # Get cart
        cursor.execute("""
            SELECT c.product_id, c.quantity, p.price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = %s
        """, (user_id,))
        
        cart_items = cursor.fetchall()
        if not cart_items:
            cursor.close()
            return jsonify({'error': 'Cart is empty'}), 400
        
        total = sum(item['price'] * item['quantity'] for item in cart_items)
        
        # Create order
        cursor.execute("""
            INSERT INTO orders (user_id, total_amount, payment_method, delivery_address, status)
            VALUES (%s, %s, %s, %s, 'pending')
        """, (user_id, total, payment_method, delivery_address))
        
        order_id = cursor.lastrowid
        
        # Add items to order
        for item in cart_items:
            cursor.execute("""
                INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
                VALUES (%s, %s, %s, %s)
            """, (order_id, item['product_id'], item['quantity'], item['price']))
            
            # Update stock
            cursor.execute("""
                UPDATE products SET stock = stock - %s WHERE id = %s
            """, (item['quantity'], item['product_id']))
        
        # Clear cart
        cursor.execute("DELETE FROM cart WHERE user_id = %s", (user_id,))
        
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({
            'message': 'Order created',
            'order_id': order_id,
            'total': float(total)
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    try:
        mysql = current_app.extensions['mysql']
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
        order = cursor.fetchone()
        
        if not order:
            cursor.close()
            return jsonify({'error': 'Order not found'}), 404
        
        cursor.execute("""
            SELECT oi.product_id, oi.quantity, oi.price_at_purchase, p.name
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = %s
        """, (order_id,))
        
        items = cursor.fetchall()
        cursor.close()
        
        order['items'] = items
        return jsonify(order), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500