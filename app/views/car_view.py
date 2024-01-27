from models import db, Car, CarReview
from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

car_bp = Blueprint('car_bp', __name__)

from models import db, Car
from flask import Flask, jsonify, request, Blueprint

car_bp = Blueprint('car_bp', __name__)

# ADDING A NEW CAR
@car_bp.route("/cars", methods=['POST'])
@jwt_required() 
def add_car():
    data = request.get_json()
    image = data['image']   
    name = data['name']
    brand = data['brand']
    model = data['model']
    year = int(data['year'])
    color = data['color']
    daily_rate = int(data['daily_rate'])

    new_car = Car(image=image,name=name, brand=brand, model=model, year=year, color=color,daily_rate= daily_rate, available=True)
    db.session.add(new_car)
    db.session.commit()
    return jsonify({"success": "Added new car"}), 201

# GETTING ALL CARS 
@car_bp.route("/cars")
def get_cars():
    cars = Car.query.all()
    car_list = []
    for car in cars:
        car_list.append({
            'id': car.id,
            'image':car.image,
            'name': car.name,
            'brand': car.brand,
            'model': car.model,
            'year': car.year,
            'color': car.color,
            'daily_rate': car.daily_rate,
            'available': car.available,
        })
    return jsonify(car_list), 200

# GETTING A SINGLE CAR
@car_bp.route("/cars/<int:car_id>")
def get_car(car_id):
    car = Car.query.get(car_id)
    if car:
        car_list={
            'id': car.id,
            'image':car.image,
            'name': car.name,
            'brand': car.brand,
            'model': car.model,
            'year': car.year,
            'color': car.color,
            'daily_rate': car.daily_rate,
            'available': car.available,
        }
        return jsonify(car_list), 200
    else:
        return jsonify({"error": "Car not found"}), 404
    

# UPDATING CAR DETAILS
@car_bp.route("/cars/<int:car_id>/availability", methods=["PUT"])
@jwt_required() 
def update_car_availability(car_id):
    car = Car.query.get(car_id)

    if car:
        data = request.get_json()
        available = data['available']

        # Validate the request data
        if available not in ['True', 'False']:
            return jsonify({"error": "Invalid value provided"}), 400

        # Update car availability
        car.available = available == 'True'

        db.session.commit()
        return jsonify({"success": "Updated car availability successfully"}), 200
    else:
        return jsonify({"error": "Car not found, cannot update availability"}), 404
    
# DELETING A CAR
@car_bp.route("/cars/<int:car_id>", methods=["DELETE"])
@jwt_required() 
def delete_car(car_id):
    car = Car.query.get(car_id)

    if car:
        
        CarReview.query.filter_by(car_id=car_id).delete()

        db.session.delete(car)
        db.session.commit()
        return jsonify({"success": "Deleted car successfully"}), 200
    else:
        return jsonify({"error": "Car not found, cannot be deleted"}), 404
