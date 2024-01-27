from models import db, User
from flask import Flask, jsonify, request, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

# USER CRUD
# ADDING A USER(register)
@user_bp.route("/register", methods=['POST'])
def add_users():
    data = request.get_json()
    
    username = data['username']
    password = generate_password_hash(data['password'])
    email = data['email']
    phone = data['phone']

    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()
    check_phone = User.query.filter_by(phone=phone).first()

    if check_username or check_email or check_phone:
        return jsonify({"error": "Invalid username or email or phone, already exists"}),404
    else:
        new_user = User(username=username, password=password, email=email, phone=phone)
        db.session.add(new_user)
        db.session.commit()
    return jsonify({"success": "Added new user"}), 201

# GET ALL USERS
# @user_bp.route("/users")
# def get_users():
#     users = User.query.all()
#     user_list = []
#     for user in users:
#         user_list.append({
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'phone': user.phone,
#         })
#     return jsonify({"users": user_list}), 200

# GET A SINGLE USER(profile)
@user_bp.route("/user")
@jwt_required()
def get_user():
    user_id=get_jwt_identity()
    user = User.query.get(user_id)
    
    if user:
        
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone': user.phone,
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404

#reset password
@user_bp.route('/reset_password' ,methods=['POST'])
def reset_password():
    data = request.get_json()

    # Extract data from the request
    username = data['username']
    email = data['email']
    new_password = data['password']

    # Verify details
    check_user = User.query.filter_by(email=email).first()

    if not check_user or check_user.username.lower() != username.lower():
        return jsonify({"error": "Details do not match"}), 404

    # Update the user's password
    check_user.password = generate_password_hash(new_password)
    
    db.session.commit()

    return jsonify({"success": "Password changed successfully"}), 200


#change password
@user_bp.route('/change_password', methods=['POST'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()  # current user id

    data = request.get_json()

    current_password = data['current_password']
    new_password = data['new_password']

    if not current_password or not new_password:
        return jsonify({"error": "Both current password and new password are required"}), 400

    user = User.query.filter_by(id=user_id).first()

   
    
    if user:
        if check_password_hash(user.password, current_password):
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({"success":"password changed"}),201

        return jsonify({"error":"Wrong current password!"}),404


#update user details
@user_bp.route('/update_user', methods=['PATCH'])
@jwt_required()
def update_user_details():
    user_id = get_jwt_identity()  # current user id
    user = User.query.filter_by(id=user_id).first()

    if user:
        data = request.get_json()
        

        username = data.get('username', user.username)  
        email = data.get('email', user.email)  
        phone = data.get('phone', user.phone)  

        user.username = username.title()

        # Check if the provided email is different from the current email
        if email != user.email:
            check_email = User.query.filter_by(email=email).first()
            if check_email:
                return jsonify({"error": f"The email: {email} already exists"}), 404
            user.email = email

        # Check if the provided phone is different from the current phone
        if phone != user.phone:
            check_phone = User.query.filter_by(phone=phone).first()
            if check_phone:
                return jsonify({"error": f"The phone: {phone} already exists"}), 404
            user.phone = phone

        # Update the user
        db.session.commit()
        return jsonify({"success": "User updated successfully"}), 200

    else:
        return jsonify({"error": "User not found"}), 404

# DELETING A USER
@user_bp.route("/delete_user", methods=["DELETE"])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "Deleted user successfully"}), 200

    else:
        return jsonify({"error": "User not found!, cannot be deleted"}), 404
