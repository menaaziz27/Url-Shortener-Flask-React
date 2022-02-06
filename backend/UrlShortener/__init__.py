from flask import Flask, make_response, jsonify
from flask_cors import CORS
from UrlShortener.exceptions import CustomApiException

app = Flask(__name__)

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify( { "status": "failed", "message": "Bad Request" } ), 400)

@app.errorhandler(CustomApiException)
def catch_api_errors(error):
    response = {"status": "failed", "error": error.description}
    if len(error.args) > 0:
        response["message"] = error.args[0]
    return jsonify(response), error.code

@app.errorhandler(401)
def unauthorized(error):
    return make_response(jsonify( { "status": "failed", "message": "Not Authorized" } ), 400)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { "status": "failed", "message": "not found" } ), 404)

@app.errorhandler(500)
def server_error(error):
    return make_response(jsonify( {"status": "failed", "message": "Internal server error"} ), 500)

# to prevent circular import
from UrlShortener import routes
