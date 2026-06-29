import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')

    MYSQL_HOST = 'hayabusa.proxy.rlwy.net'
    MYSQL_PORT = 59062
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'MGXBNJcwhjoVdfQkMexWKnycYSUtnYgn'
    MYSQL_DB = 'railway'
    MYSQL_CURSORCLASS = 'DictCursor'