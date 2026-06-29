from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

mysql = MySQL(app)
app.extensions['mysql'] = mysql

CORS(app)

from routes.api import api_bp
app.register_blueprint(api_bp)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Backend running'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)