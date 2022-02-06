class CustomApiException(Exception):
    code = 400
    description = "Invalid content-type. Must be application/json."
