from flask import Flask, jsonify, request, Blueprint
from models import db, CarReview, User, Car
from flask_jwt_extended import jwt_required, get_jwt_identity

car_review_bp = Blueprint('car_review_bp', __name__)

# Create a new car review
@car_review_bp.route("/carreviews", methods=['POST'])
@jwt_required()
def add_car_review():
    data = request.get_json()
    rating_str = data['rating']

    if rating_str is None:
        return jsonify({"error": "Rating is missing"}), 400

    try:
        rating = int(rating_str)
    except ValueError:
        return jsonify({"error": "Invalid rating format"}), 400

    comment = data['comment']
    user_id = int(data['user_id'])
    car_id = int(data['car_id'])

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
    return jsonify(car_review_list), 200

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
        return jsonify(car_review_list), 200
    else:
        return jsonify({"error": "Car review not found"}), 404

# Editing a car review
@car_review_bp.route("/carreviews/<int:review_id>", methods=["PUT"])
@jwt_required()
def update_car_review(review_id):
    user_id = get_jwt_identity()
    review = CarReview.query.filter_by(id=review_id,user_id=user_id).first()

    if review:
        data = request.get_json()
        rating = data['rating']
        comment = data['comment']
        # user_id = data['user_id']
        car_id = data['car_id']

        # Check if the user and car exist
        # user = User.query.get(user_id)
        # car = Car.query.get(car_id)

        # if not user or not car:
        #     return jsonify({"error": "User or Car not found"}), 404

        review.rating = int(rating)
        review.comment = comment
        review.user_id = int(user_id)
        review.car_id = int(car_id)

        db.session.commit()
        return jsonify({"success": "Updated car review successfully"}), 200
    else:
        return jsonify({"error": "Car review not found, cannot be updated"}), 404

# Delete a car review
@car_review_bp.route("/carreviews/<int:review_id>", methods=["DELETE"])
@jwt_required()
def delete_car_review(review_id):
    user_id = get_jwt_identity() #current user id
    review = CarReview.query.filter_by(id=review_id,user_id=user_id).first()

    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"success": "Deleted car review successfully"}), 200
    else:
        return jsonify({"error": " cannot be deleted"}), 404
