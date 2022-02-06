import os 
from UrlShortener import app
from UrlShortener.routes import routes
from dotenv import load_dotenv
load_dotenv()

PORT = int(os.getenv("PORT"))

app.register_blueprint(routes) 

if __name__ == '__main__':
    app.run(port=PORT,debug=True)
