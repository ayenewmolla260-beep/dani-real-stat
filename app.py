from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
app = Flask(__name__)

# Settings
app.config["SECRET_KEY"] = "dani-real-estate"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# ======================
# Property Database
# ======================
class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    # sale or rent
    type = db.Column(db.String(20), nullable=False)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    area = db.Column(db.String(100))
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    video = db.Column(db.String(255))


# ======================
# Admin Database
# ======================
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))


# ======================
# Home
# ======================
@app.route("/")
def home():
    return render_template("index.html")


# ======================
# Dashboard (አሁን ያለ ሎጊን መግባት ይቻላል)
# ======================
@app.route("/admin/dashboard")
def dashboard():
    properties = Property.query.all()
    return render_template(
        "admin/dashboard.html",
        properties=properties
    )


# ======================
# Add Property (አሁን ያለ ሎጊን መግባት ይቻላል)
# ======================
@app.route("/admin/add-property", methods=["GET", "POST"])
def add_property():

    if request.method == "POST":

        image = request.files["image"]
        video = request.files["video"]

        image_name = ""
        video_name = ""

        if image and image.filename:
            image_name = secure_filename(image.filename)
            image.save(os.path.join("static/images", image_name))

        if video and video.filename:
            video_name = secure_filename(video.filename)
            video.save(os.path.join("static/videos", video_name))

        property = Property(
            title=request.form["title"],
            price=request.form["price"],
            location=request.form["location"],
            type=request.form["type"],
            bedrooms=request.form["bedrooms"],
            bathrooms=request.form["bathrooms"],
            area=request.form["area"],
            description=request.form["description"],
            image=image_name,
            video=video_name
        )

        db.session.add(property)
        db.session.commit()

        return redirect("/admin/dashboard")

    return render_template("admin/add-property.html")


# ======================
# Buy Page
# ======================
@app.route("/buy")
def buy():
    properties = Property.query.filter_by(
        type="sale"
    ).all()
    return render_template(
        "buy.html",
        properties=properties
    )


# ======================
# Sell Page
# ======================
@app.route("/sell")
def sell():
    properties = Property.query.filter_by(
        type="sale"
    ).all()
    return render_template(
        "sell.html",
        properties=properties
    )


# ======================
# Rent Page
# ======================
@app.route("/rent")
def rent():
    properties = Property.query.filter_by(
        type="rent"
    ).all()
    return render_template(
        "rent.html",
        properties=properties
    )


# ======================
# Create Database
# ======================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database Ready")

    app.run(debug=True)
