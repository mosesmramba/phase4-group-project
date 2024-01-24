from models import db, User, Car, Booking, CarReview
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite" 
db.init_app(app)
migrate = Migrate(app, db)  

# GET all cars
@app.route('/cars', methods=['GET'])
def get_cars():
    cars = Car.query.all()
    car_list = []
    for car in cars:
        car_list.append({
            'id': car.id,
            'name': car.name,
            'brand': car.brand,
            'model': car.model,
            'year': car.year,
            'color': car.color
        })
    return jsonify({"cars": car_list}), 200

# GET cars by Id
@app.route('/cars/<int:car_id>', methods=['GET'])
def get_cars_by_id(car_id):
    car = Car.query.get(car_id)

    if car:
        car_details = {
            'id': car.id,
            'name': car.name,
            'brand': car.brand,
            'model': car.model,
            'year': car.year,
            'color': car.color
        }
        return jsonify(car_details), 200
    else:
        return jsonify({"error": "Car not found"}), 404

# Add a new car
@app.route('/cars', methods=['POST'])
def add_a_new_car():
    try:
        data = request.get_json()

        # Validation
        if "name" not in data or "brand" not in data or "model" not in data or "year" not in data:
            return jsonify({"error": "Cannot add vehicle. Missing required fields."}), 400

        # Field to add a new car
        new_car = Car(
            name=data["name"],
            brand=data["brand"],
            model=data["model"],
            year=data["year"],
            color=data.get("color"),  # Color is optional in your model
        )

        db.session.add(new_car)
        db.session.commit()

        # Return the details of the newly added car
        car_details = {
            'id': new_car.id,
            'name': new_car.name,
            'brand': new_car.brand,
            'model': new_car.model,
            'year': new_car.year,
            'color': new_car.color,
        }

        return jsonify(car_details), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Delete a car by Id from the system
@app.route('/cars/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    car = Car.query.get(car_id)
    if car:
        # Delete the car
        db.session.delete(car)
        db.session.commit()

        return jsonify({}), 204
    else:
        return jsonify({"error": "Car not found"}), 404


# Update details of a specific car
@app.route("/cars/<int:car_id>", methods=["PUT"])
def update_car(car_id):
    car = db.session.query(Car).get(car_id)  
    if car:
        data = request.get_json()
        car.name = data.get('name', car.name)
        car.brand = data.get('brand', car.brand)
        car.model = data.get('model', car.model)
        car.year = data.get('year', car.year)
        car.color = data.get('color', car.color)

        # Check if 'available' is in the data and update the field
        if 'available' in data:
            car.available = data['available']

        db.session.commit()
        return jsonify({"message": "Car updated successfully"}), 200
    else:
        return jsonify({"error": "Car not found"}), 404

#Get each cars rating
@app.route('/cars/<int:car_id>/rate', methods=['POST'])
def rate_car(car_id):
    data = request.get_json()

    if "rating" not in data or not isinstance(data["rating"], int) or data["rating"] < 1 or data["rating"] > 5:
        return jsonify({"error": "Invalid rating. Must be an integer between 1 and 5."}), 400

    car = Car.query.get(car_id)

    if not car:
        return jsonify({"error": "Car not found"}), 404

    new_review = CarReview(
        rating=data["rating"],
        user_id=1, 
        car_id=car_id
    )

    db.session.add(new_review)
    db.session.commit()

    # Recalculate the average rating for the car
    car.calculate_average_rating()

    return jsonify({"message": "Rating submitted successfully"}), 201

#To display all car reviews
@app.route('/cars/<int:car_id>/reviews', methods=['GET'])
def get_car_reviews(car_id):
    car = Car.query.get(car_id)

    if not car:
        return jsonify({"error": "Car not found"}), 404

    reviews = CarReview.query.filter_by(car_id=car_id).all()

    review_list = []
    for review in reviews:
        review_list.append({
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'user_id': review.user_id,
            'car_id': review.car_id
        })

    return jsonify({"reviews": review_list}), 200



if __name__ == '__main__':
    app.run(port=5000, debug=True)
