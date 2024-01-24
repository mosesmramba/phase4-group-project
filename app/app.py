from models import db, User, Car, Booking, CarReview
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from views import *
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite" 
db.init_app(app)
migrate = Migrate(app, db) 

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = "defqoweqyreihghc"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt.init_app(app)

app.register_blueprint(user_bp)
app.register_blueprint(car_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(car_review_bp)
app.register_blueprint(auth_bp)

@jwt.token_in_blocklist_loader
def token_in_blocklist_call(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None

if __name__ == '__main__':
    app.run(port=5000, debug=True)
