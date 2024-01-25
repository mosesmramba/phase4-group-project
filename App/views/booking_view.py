from flask import Flask, jsonify, request, Blueprint
from datetime import datetime, timedelta
from models import db, Booking,Car
from flask_jwt_extended import jwt_required, get_jwt_identity

booking_bp = Blueprint('booking_bp', __name__)

# Create a new booking POST
@booking_bp.route("/rent-vehicle", methods=['POST'])
@jwt_required() 
def add_booking():
    current_user_id = get_jwt_identity()

    if not current_user_id:
        return jsonify({"error": "Invalid token"}), 401

    data = request.form
    start_date = datetime.strptime(data.get('start_date'), "%Y-%m-%d %H:%M:%S")
    end_date = datetime.strptime(data.get('end_date'), "%Y-%m-%d %H:%M:%S")
    car_id = int(data.get('car_id'))

    car = Car.query.get(car_id)

    if not car:
        return jsonify({"error": "Car not found"}), 404

    if not car.available:
        return jsonify({"error": "Car is not available for booking"}), 400

    # Check if the car is already booked for the given period
    existing_bookings = Booking.query.filter(
        Booking.car_id == car_id,
        Booking.start_date < end_date,
        Booking.end_date > start_date
    ).all()

    if existing_bookings:
        return jsonify({"error": "Car is already booked for the given period"}), 400

    # Calculate price based on provided start and end dates
    daily_rate = car.daily_rate
    num_days = (end_date - start_date).days
    price = daily_rate * num_days

    new_booking = Booking(start_date=start_date, end_date=end_date, price=price, user_id=current_user_id, car_id=car_id)
    db.session.add(new_booking)
    db.session.commit()

    # Update car availability status
    car.available = False
    db.session.commit()

    return jsonify({"success": "Added new booking"}), 201

# Get all bookings GET
@booking_bp.route("/bookings")
@jwt_required()
def get_bookings():
    bookings = Booking.query.all()
    booking_list = []
    for booking in bookings:
        booking_list.append({
            'id': booking.id,
            'start_date': booking.start_date.strftime("%Y-%m-%d %H:%M:%S"),
            'end_date': booking.end_date.strftime("%Y-%m-%d %H:%M:%S"),
            'price': booking.price,
            'user_id': booking.user_id,
            'car_id': booking.car_id,
        })
    return jsonify({"bookings": booking_list}), 200

# Get a single booking GET
@booking_bp.route("/bookings/<int:booking_id>")
@jwt_required() 
def get_booking(booking_id):
    booking = Booking.query.get(booking_id)
    booking_list = []
    if booking:
        booking_list.append({
            'id': booking.id,
            'start_date': booking.start_date.strftime("%Y-%m-%d %H:%M:%S"),
            'end_date': booking.end_date.strftime("%Y-%m-%d %H:%M:%S"),
            'price': booking.price,
            'user_id': booking.user_id,
            'car_id': booking.car_id,
        })
        return jsonify({"bookings": booking_list}), 200
    else:
        return jsonify({"error": "Booking not found"}), 404

# Update a booking PUT
@booking_bp.route("/bookings/<int:booking_id>", methods=["PUT"])
@jwt_required() 
def update_booking(booking_id):
    booking = Booking.query.get(booking_id)

    if booking:
        data = request.form
        start_date = datetime.strptime(data.get('start_date'), "%Y-%m-%d %H:%M:%S")  # Assuming the date format
        end_date = datetime.strptime(data.get('end_date'), "%Y-%m-%d %H:%M:%S")
        user_id = int(data.get('user_id'))
        car_id = int(data.get('car_id'))

        # Calculate price based on updated start and end dates
        daily_rate = 3000
        num_days = (end_date - start_date).days
        price = daily_rate * num_days

        booking.start_date = start_date
        booking.end_date = end_date
        booking.price = price
        booking.user_id = user_id
        booking.car_id = car_id

        db.session.commit()
        return jsonify({"success": "Updated booking successfully"}), 200
    else:
        return jsonify({"error": "Booking not found, cannot be updated"}), 404

# Delete a booking DELETE
@booking_bp.route("/bookings/<int:booking_id>", methods=["DELETE"])
@jwt_required() 
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)

    if booking:
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"success": "Deleted booking successfully"}), 200
    else:
        return jsonify({"error": "Booking not found, cannot be deleted"}), 404