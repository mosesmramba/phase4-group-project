from models import db, User
from flask import Flask, jsonify, request, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
user_bp = Blueprint('user_bp', __name__)

#USER CRUD
#ADDING A USER
@user_bp.route("/signup", methods=['POST'])
def add_users():
    data = request.form
    username = data.get('username')
    password = generate_password_hash(data.get('password'))
    email = data.get('email')
    phone = data.get('phone')

    check_username = User.query.filter_by(username = username).first()
    check_email = User.query.filter_by(email = email).first()
    
    if check_username or check_email:
      return jsonify({"error": "Invalid username or email,already exists"})
    else:
      new_user=User(username=username,password=password,email=email,phone=phone)
      db.session.add(new_user)
      db.session.commit()
    return jsonify({"success":"Added new user"}), 201


#GET ALL USERS
@user_bp.route("/users")
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

#GET A SINGLE USER
@user_bp.route("/users/<int:user_id>")
def get_user(user_id):
    user = User.query.get(user_id)
    user_list = []
    if user:
        user_list.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone': user.phone,
        })
        return jsonify({"users": user_list}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Update or Reset Password
@user_bp.route("/users/<int:user_id>/password", methods=['PUT'])
def update_password(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.form
        current_password = data.get('current_password')
        new_password = data.get('new_password')

        if not check_password_hash(user.password, current_password):
            return jsonify({"error": "Invalid current password"}), 401

        # Update the password
        user.password = generate_password_hash(new_password)
        db.session.commit()

        return jsonify({"success": "Password updated successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
# UPDATE A USER password and username
@user_bp.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.form
        username = data.get('username')
        password = data.get('password')
        

        check_username = User.query.filter_by(username=username).first()

        if check_username:
            return jsonify({"error": "Invalid username, already exists"})
        else:
            user.username = username
            user.password = password
           
            db.session.commit()
            return jsonify({"success": "Updated user successfully"}), 200

    else:
        return jsonify({"error": "User not found, cannot be updated"}), 404

#DELETING A USER
@user_bp.route("/users/<int:user_id>", methods =["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success":"Deleted user succesfuly"}), 200

    else:
        return jsonify({"error":"User not found!,cannot be deleted"}), 404
    