from models import db, User, Car, Booking, CarReview
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite" 
db.init_app(app)
migrate = Migrate(app, db)  

#GET all users
@app.route("/users")
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone': user.phone,

        })
    return jsonify({"users": user_list}),200
#fetching single user


if __name__ == '__main__':
    app.run(port=5000, debug=True)
