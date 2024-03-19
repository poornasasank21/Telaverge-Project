from flask import Flask, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from datetime import datetime, timedelta
import uuid
import hashlib
from json import JSONEncoder
from flask_cors import CORS 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost/tempdb'
db = SQLAlchemy(app)
api = Api(app)
CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(250), nullable=False)

class ShortLink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    original_url = db.Column(db.String(255), nullable=False)
    short_url = db.Column(db.String(10), unique=True, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    expires_at = db.Column(db.TIMESTAMP)
    
class URLVisitor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    short_url_id = db.Column(db.Integer, db.ForeignKey('short_link.id'), nullable=False)
    visitor_date = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    
    
    
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)
    
app.json_encoder = CustomJSONEncoder


class RegistrationResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        name = data.get('name')

        existing_user = User.query.filter_by(username=username).first()

        if existing_user:
            return {'message': 'Username already exists'}, 400

        existing_email = User.query.filter_by(email=email).first()
        
        if existing_email:
            return {'message': 'Email already exists'}, 400

        new_user = User(username=username, password=password, email=email, name=name)
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'Registration successful', 'user_id': new_user.id}, 201

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username, password=password).first()

        if user:
            return {'message': 'Login successful', 'user_id': user.id}, 200
        else:
            return {'message': 'Invalid credentials'}, 401

class LogoutResource(Resource):
    def post(self):
        
        return {'message': 'Logout successful'}, 200

class ShortLinkResource(Resource):
    
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        original_url = data.get('original_url')

        user = User.query.get(user_id)

        if user:
            short_url = str(uuid.uuid4())[:8]  

            expires_at = datetime.utcnow() + timedelta(hours=48)

            new_link = ShortLink(user_id=user_id, original_url=original_url, short_url=short_url, expires_at=expires_at)
            db.session.add(new_link)
            db.session.commit()

            return {'short_link': f'http://localhost:4200/url/{short_url}'}, 201
        else:
            return {'message': 'User not found'}, 404
        

class RedirectResource(Resource):
    def get(self, short_url):
        # print(short_url)
        link = ShortLink.query.filter_by(short_url=short_url).first()
        
        if link and link.expires_at > datetime.utcnow():
            url_visitor = URLVisitor(short_url_id=link.id)
            db.session.add(url_visitor)
            db.session.commit()
            return {'original_url': link.original_url}, 200
        else:
            return {'message': 'Short URL not found or has expired'}, 404

class AnalyticsResource(Resource):
    def get(self, user_id):
        links = ShortLink.query.filter_by(user_id=user_id).all()

        # analytics = [{'short_url': link.short_url,
        #               'original_url': link.original_url,
        #               'expires_at' : link.expires_at.isoformat() if link.expires_at else None,
        #               'created_at': link.created_at.isoformat() if link.created_at else None}
        #              for link in links]
        
        analytics = []
        
        for link in links:
            url_visitors = URLVisitor.query.filter_by(short_url_id=link.id).all()
            visitors = {}
            for url_visitor in url_visitors:
                visitor_date = url_visitor.visitor_date.date().isoformat()
                if visitor_date in visitors:
                    visitors[visitor_date] += 1
                else:
                    visitors[visitor_date] = 1
            converted_visitors = [
                {"date": key, "count": value}
                for key, value in visitors.items()
]     
            analytics.append({'short_url': link.short_url,
                              'original_url': link.original_url,
                              'expires_at' : link.expires_at.isoformat() if link.expires_at else None,
                              'created_at': link.created_at.isoformat() if link.created_at else None,
                              'visitors': converted_visitors})

        return jsonify({'analytics': analytics})
    
# class URLVisitorResource(Resource):
#     def get(self, short_url_id):
#         url_visitors = URLVisitor.query.filter_by(short_url_id=short_url_id).all()
#         # Group the data by date
        
#         visitors = {}
        
#         for url_visitor in url_visitors:
#             visitor_date = url_visitor.visitor_date.date().isoformat()
#             if visitor_date in visitors:
#                 visitors[visitor_date] += 1
#             else:
#                 visitors[visitor_date] = 1
                
#         return jsonify({'visitors': visitors})

api.add_resource(RegistrationResource, '/register')
api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')
api.add_resource(ShortLinkResource, '/create_short_link')
api.add_resource(RedirectResource, '/<short_url>')
api.add_resource(AnalyticsResource, '/analytics/<user_id>')
# api.add_resource(URLVisitorResource, '/url_visitors/<short_url_id>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
