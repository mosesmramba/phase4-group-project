from flask import Flask, jsonify, request, Blueprint
from models import db, CarReview, User, Car
from flask_jwt_extended import jwt_required, get_jwt_identity

car_review_bp = Blueprint('car_review_bp', __name__)

# Create a new car review
@car_review_bp.route("/carreviews", methods=['POST'])
@jwt_required()
def add_car_review():
    data = request.form
    rating_str = data.get('rating')

    if rating_str is None:
        return jsonify({"error": "Rating is missing"}), 400

    try:
        rating = int(rating_str)
    except ValueError:
        return jsonify({"error": "Invalid rating format"}), 400

    comment = data.get('comment')
    user_id = int(data.get('user_id'))
    car_id = int(data.get('car_id'))

    # Check if the user and car exist
    user = User.query.get(user_id)
    car = Car.query.get(car_id)

    if not user or not car:
        return jsonify({"error": "User or Car not found"}), 404

    new_review = CarReview(rating=rating, comment=comment, user_id=user_id, car_id=car_id)
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"success": "Added new car review"}), 201

# Get all car reviews
@car_review_bp.route("/carreviews")
def get_car_reviews():
    car_reviews = CarReview.query.all()
    car_review_list = []
    for review in car_reviews:
        car_review_list.append({
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'user_id': review.user_id,
            'car_id': review.car_id,
        })
    return jsonify({"car_reviews": car_review_list}), 200

# Get a single car review
@car_review_bp.route("/carreviews/<int:review_id>")
def get_car_review(review_id):
    review = CarReview.query.get(review_id)
    car_review_list = []
    if review:
        car_review_list.append({
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'user_id': review.user_id,
            'car_id': review.car_id,
        })
        return jsonify({"car_reviews": car_review_list}), 200
    else:
        return jsonify({"error": "Car review not found"}), 404

# Editing a car review
@car_review_bp.route("/carreviews/<int:review_id>", methods=["PUT"])
@jwt_required()
def update_car_review(review_id):
    review = CarReview.query.get(review_id)

    if review:
        data = request.form
        rating = int(data.get('rating'))
        comment = data.get('comment')
        user_id = int(data.get('user_id'))
        car_id = int(data.get('car_id'))

        # Check if the user and car exist
        user = User.query.get(user_id)
        car = Car.query.get(car_id)

        if not user or not car:
            return jsonify({"error": "User or Car not found"}), 404

        review.rating = rating
        review.comment = comment
        review.user_id = user_id
        review.car_id = car_id

        db.session.commit()
        return jsonify({"success": "Updated car review successfully"}), 200
    else:
        return jsonify({"error": "Car review not found, cannot be updated"}), 404

# Delete a car review
@car_review_bp.route("/carreviews/<int:review_id>", methods=["DELETE"])
@jwt_required()
def delete_car_review(review_id):
    review = CarReview.query.get(review_id)

    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"success": "Deleted car review successfully"}), 200
    else:
        return jsonify({"error": "Car review not found, cannot be deleted"}), 404