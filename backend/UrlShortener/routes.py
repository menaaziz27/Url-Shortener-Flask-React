from flask import jsonify, Response, request, redirect, Blueprint
from bson.json_util import dumps
from bson.objectid import ObjectId
from UrlShortener.validation import CreateUrlSchema, UpdateUrlSchema
from UrlShortener.db import Url
from UrlShortener.helpers import *
from UrlShortener.exceptions import CustomApiException
from UrlShortener import *


# --- Global Var ---
BASE_URL = "http://localhost:8000/"

routes = Blueprint('routes', __name__)


"""
 * @desc     Get single URL
 * @route    GET /shortlinks/<_id>
 * @returns  { JSON } - JSON url 
"""
@routes.route("/shortlinks/<_id>", methods =['GET'])
def get_url_by_id(_id):
    
    url = Url.find_one({"_id":ObjectId(_id)})
    url["_id"] = str(url["_id"])
    
    return Response(
        response=dumps(url),
        status=200,
        mimetype='application/json'
    )

update_url_schema = UpdateUrlSchema()

"""
 * @desc     Update URL by slug
 * @route    GET /shortlinks/<_id>
 * @returns  { string } - "update!" 
"""
@routes.route("/shortlinks/<slug>", methods =['PUT'])
def update_ulr_by_slug(slug):
    data = request.json
    errors = update_url_schema.validate(data)
    if errors:
        return jsonify(errors)
    
    Url.update_one({"slug":slug}, {"$set" : data}, upsert=True)
    
    return Response(
        response="updated!",
        status=201,
        mimetype='application/json'
    )


"""
 * @desc     Get URL by slug
 * @route    GET /<slug>
"""
@routes.route("/<slug>", methods =['GET'])
def get_original_url(slug):
    url = Url.find_one({"slug":slug}, {"_id": 0})
    
    if url is None:
        return bad_request(Exception("Slug is incorrect"))
    
    # iOS | Android | Windows | Other
    family = determine_device_family(request) 
    
    print(family)
    redirected_link = determine_url_redirection(url, family)
    
    return redirect(redirected_link)


"""
 * @desc     Get all URLs
 * @route    GET /shortlinks
 * @returns  { Array } - array of JSON URLs documents  
"""
@routes.route("/shortlinks", methods =['GET'])
def get_short_urls():
    urls = list(Url.find())
    
    my_urls = []
    for url in urls:
        url_obj = {}
        url_obj.update({"_id": str(url["_id"])})
        url_obj.update({"url": BASE_URL + url["slug"]})
        url_obj.update({"slug": url["slug"]})
        my_urls.append(url_obj)
    
    return Response(
        response=dumps(my_urls),
        status=200,
        mimetype='application/json'
    )


create_url_schema = CreateUrlSchema()

"""
 * @desc     Create URL 
 * @route    POST /shortlinks
 * @returns  { string } - generated short url
"""
@routes.route("/shortlinks", methods =['POST'])
def create_short_url():

    if request.content_type != "application/json":
        raise CustomApiException("Error")
    
    data = request.json
    
    errors = create_url_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    slug = data.get("slug", generate_slug())
    
    if slug.strip() == "":
        slug = generate_slug()
        
    # generate a new slug if it's already exist
    while Url.find_one({"slug": slug}) is not None:
        slug = generate_slug()
    
    if {"ios", "android", "web"} <= data.keys():
        ios = data['ios']
        android = data['android']
        web = data['web']
        Url.insert_one({"slug" : slug, "ios" : ios, "android" : android, "web" : web})
        url = Url.find_one({"slug": slug})
        
        return jsonify({
            "url": BASE_URL + url["slug"]
        }), 201
        
    else:
        return server_error(Exception("Internal server error."))
