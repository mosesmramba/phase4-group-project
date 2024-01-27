from models import db, User, TokenBlocklist
from flask import Flask, jsonify, request, Blueprint
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

auth_bp = Blueprint('auth_bp', __name__)

#LOGIN
@auth_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user: 
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity = user.id)
            return jsonify(access_token=access_token),201
        return jsonify({"error": "Wrong Password!"}), 401
    
    else:
        return jsonify({"error":"User doesnt exist"}), 404
        
#GETTING USER THAT ARE LOGGED IN
@auth_bp.route("/loggedIn", methods=['GET'])
@jwt_required()
def loggedIn():
    current_user_id = get_jwt_identity()#current user
    user = User.query.get (current_user_id)

    if user:
        user_data= {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone': user.phone,
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404
        


#LOGGING OUT
@auth_bp.route("/logout", methods=['POST'])
@jwt_required()
def logout():
    jwt = get_jwt()

    jti = jwt['jti']
    
    token_whoosh = TokenBlocklist(jti=jti)
    db.session.add(token_whoosh)
    db.session.commit()

    return jsonify({"success": "Logged out successfully!"}), 201
    