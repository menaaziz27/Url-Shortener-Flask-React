from UrlShortener import app
from UrlShortener.routes import routes

app.register_blueprint(routes) 

if __name__ == '__main__':
    app.run(port=8000,debug=True)
