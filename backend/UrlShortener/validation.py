from marshmallow import Schema, fields, ValidationError

def validate_value_type(key):
    if key not in str(["primary", "fallback"]):
        print(key)
        raise ValidationError(f'{key}\'s is not a valid key value')
    
class CreateUrlSchema(Schema):
    ios = fields.Dict(keys=fields.String(validate=validate_value_type), values=fields.String(), required=True)
    android = fields.Dict(keys=fields.String(validate=validate_value_type), values=fields.String(), required=True)
    web = fields.Str(required=True)
    slug = fields.Str()


class UpdateUrlSchema(Schema):
    ios = fields.Dict(keys=fields.String(validate=validate_value_type), values=fields.String())
    android = fields.Dict(keys=fields.String(validate=validate_value_type), values=fields.String())
    web = fields.Str()

