from app import app, db, User, Car, Booking, CarReview
from datetime import datetime, timedelta

def seed_data():
    with app.app_context():
        # Users
        user1 = User(username='user1', password='password1', email='user1@example.com', phone='1234567890')
        user2 = User(username='user2', password='password2', email='user2@example.com', phone='9876543210')
        user3 = User(username='user3', password='password3', email='user3@example.com', phone='7896542320')
        user4 = User(username='user4', password='password4', email='user4@example.com', phone='7891112320')
        user5 = User(username='user5', password='password5', email='user5@example.com', phone='7896566320')

        db.session.add_all([user1, user2, user3, user4, user5])

        # Cars
        car1 = Car(name='Car1', brand='Mercedes', model='SUV', year=2017, color='Red', available=True)
        car2 = Car(name='Car2', brand='BMW', model='Sport Car', year=2015, color='White', available=True)
        car3 = Car(name='Car3', brand='Toyota', model='Sedan', year=2021, color='Silver', available=True)
        car4 = Car(name='Car4', brand='Toyota', model='PickUp', year=2011, color='Black', available=True)
        car5 = Car(name='Car5', brand='Subaru', model='HatchBack', year=2018, color='Blue', available=True)
        db.session.add_all([car1, car2, car3, car4, car5])

        # Daily rate for the car
        daily_rate = 3000  
        # Bookings with different start and end dates and dynamically calculated price
        booking1_start = datetime.utcnow()
        booking1_end = booking1_start + timedelta(days=1)
        booking1_price = daily_rate * (booking1_end - booking1_start).days
        booking1 = Booking(start_date=booking1_start, end_date=booking1_end, user=user1, car=car1, price=booking1_price)

        booking2_start = datetime.utcnow()
        booking2_end = booking2_start + timedelta(days=2)
        booking2_price = daily_rate * (booking2_end - booking2_start).days
        booking2 = Booking(start_date=booking2_start, end_date=booking2_end, user=user2, car=car2, price=booking2_price)

        booking3_start = datetime.utcnow()
        booking3_end = booking3_start + timedelta(days=3)
        booking3_price = daily_rate * (booking3_end - booking3_start).days
        booking3 = Booking(start_date=booking3_start, end_date=booking3_end, user=user3, car=car3, price=booking3_price)

        booking4_start = datetime.utcnow()
        booking4_end = booking4_start + timedelta(days=4)
        booking4_price = daily_rate * (booking4_end - booking4_start).days
        booking4 = Booking(start_date=booking4_start, end_date=booking4_end, user=user4, car=car4, price=booking4_price)

        booking5_start = datetime.utcnow()
        booking5_end = booking5_start + timedelta(days=5)
        booking5_price = daily_rate * (booking5_end - booking5_start).days
        booking5 = Booking(start_date=booking5_start, end_date=booking5_end, user=user5, car=car5, price=booking5_price)

        db.session.add_all([booking1, booking2, booking3, booking4, booking5])
      
        # CarReviews
        review1 = CarReview(rating=5, comment='Great car!', user=user1, car=car1)
        review2 = CarReview(rating=4, comment='Nice experience!', user=user2, car=car2)
        review3 = CarReview(rating=3, comment='Nice experience!', user=user3, car=car3)
        review4 = CarReview(rating=2, comment='Unreliable!', user=user4, car=car4)
        review5 = CarReview(rating=1, comment='Power cut out!', user=user5, car=car5)

        db.session.add_all([review1, review2, review3, review4, review5])

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    print("Started Seeding")
    seed_data()
    print("Seeding Completed")
