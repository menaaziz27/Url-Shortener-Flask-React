# Url Shortener Fullstack Application

As the name suggests, this application shortens your long URLs to a short one and redirect you to different destinations depending on your platform (iOS, Android, Desktop)

### prerequests

1. python should be installed locally
2. setup your MongoDB

### How to install

1. `git clone https://github.com/menaaziz27/url-shortener-flask-react.git`
2. `cd backend/ && pip install -r requirements.txt`
3. `python main.py`
4. `cd .. && cd client/ && npm install`
5. `npm start`

### requirements

1. You should add your .env file in the root directory of **backend/** folder
2. Your .env file should includes **PORT** & **MONGO_URI** as in **.env.example**

### Postman Collection

[<https://www.getpostman.com/collections/0b5f8044d8f1ffd2f965>](https://www.getpostman.com/collections/0b5f8044d8f1ffd2f965)

### Features

1. Create short URLs
2. Update URL
3. Fetch all short URLs
4. Input validation
5. Handling errors
6. Documented API

### Consideration

- Naming convension
- Folder Structure

### Technologies

1. Python
2. Flask
3. marshmallow for validation
4. user-agents for determining the device platform
