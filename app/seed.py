from app import app, db, User, Car, Booking, CarReview
from datetime import datetime, timedelta
from faker import Faker
from random import choice as rc
from werkzeug.security import generate_password_hash

fake = Faker()

def seed_data():
    with app.app_context():

        User.query.delete()
        Car.query.delete()
        Booking.query.delete()
        CarReview.query.delete()
        db.session.commit()
        # Users
        # users = []
        # for _ in range(20):
        #     user = User(
        #         username=fake.user_name(),
        #         email=fake.email(),
        #         phone=fake.phone_number(),
        #         password=generate_password_hash("password")
        #     )
        #     users.append(user)

        # db.session.add_all(users)

        # # Cars
        # cars = []
        # for _ in range(20):
        #     car = Car(
        #         image=fake.image_url(),
        #         name=fake.word(),
        #         brand=rc([
        #             "Toyota", "Nissan", "Mazda", "Subaru", "Mercedes-Benz",
        #             "Alfa Romeo", "Audi", "Bentley", "BMW", "Chevrolet",
        #             "Chrysler", "Citroen", "Dodge", "Ford", "Honda", "Hyundai",
        #             "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover",
        #             "Lexus", "Mini", "Mitsubishi", "Peugeot", "Porsche",
        #             "Renault", "Suzuki", "Volkswagen", "Volvo"
        #         ]),
        #         model=rc(['Van', 'SUV', 'Station Wagon', 'Sedan', 'Pickup', 'Minivan', 'Hatchback',
        #                   'Crossover', 'Coupe', 'Convertible', 'Truck', 'Electric', 'Hybrid', 'Luxury',
        #                   'Sports Car', 'Compact Car', 'Roadster', 'Limousine', 'Off-road Vehicle',
        #                    'Vintage Car', 'Muscle Car', 'Wagon', 'Compact SUV', 'Midsize SUV',
        #                   'Full-size SUV', 'Subcompact Car', 'Compact Pickup', 'Full-size Pickup', 'Convertible SUV',
        #                   'Supercar', 'Race Car'
        #                   ]),
        #         year=fake.random_int(min=2000, max=2022),
        #         color=fake.color_name(),
        #         available=True,
        #         daily_rate=fake.random_int(min=2000, max=15000)  
        #     )
        #     cars.append(car)

        # db.session.add_all(cars)

        # # Bookings with different start and end dates and calculated price
        # bookings = []
        # for car in cars:

        #     for i in range(20):
        #         start_date = datetime.utcnow() + timedelta(days=i)
        #         end_date = start_date + timedelta(days=i + 1)
        #         price = car.daily_rate * (end_date - start_date).days

        #         booking = Booking(
        #             start_date=start_date,
        #             end_date=end_date,
        #             user=rc(users),
        #             car=rc(cars),
        #             price=price
        #         )
        #         bookings.append(booking)

        # db.session.add_all(bookings)

        # # CarReviews
        # reviews = []
        
        # for i in range(20):
        #     review = CarReview(
        #         rating=rc(range(1, 5)),
        #         comment=fake.text(),
        #         user=rc(users),
        #         car=rc(cars)
        #     )
        #     reviews.append(review)

        # db.session.add_all(reviews)

        # # Commit the changes to the database
        # db.session.commit()

if __name__ == '__main__':
    print("Started Seeding")
    seed_data()
    print("Seeding Completed")
