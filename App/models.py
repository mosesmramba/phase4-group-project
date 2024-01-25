from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(14), nullable=True)
    password = db.Column(db.String(450),unique=False, nullable=False)
    bookings = db.relationship('Booking', backref='user', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('CarReview', backref='user', lazy=True, cascade='all, delete-orphan')

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti =  db.Column(db.String(100),nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(20), nullable=False)
    available = db.Column(db.Boolean, default=True)
    daily_rate = db.Column(db.Integer, nullable=False) 
    bookings = db.relationship('Booking', backref='car', lazy=True,cascade="all, delete-orphan")
    reviews = db.relationship('CarReview', backref='car', lazy=True)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('car.id', ondelete='CASCADE'), nullable=False)

    def calculate_price(self):
        num_days = (self.end_date - self.start_date).days
        self.price = self.car.daily_rate * num_days

class CarReview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('car.id', ondelete='CASCADE'), nullable=False)