import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    
    MYSQL_HOST = '127.0.0.1'
    MYSQL_PORT = 3306
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'sadidkabir21234'
    MYSQL_DB = 'jersey_shop'
    MYSQL_CURSORCLASS = 'DictCursor'