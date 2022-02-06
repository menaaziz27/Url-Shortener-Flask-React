import random
import string
from user_agents import parse
from UrlShortener import bad_request

def generate_slug():
    return ''.join(random.choice(string.ascii_letters + string.digits) for i in range(6))


def determine_url_redirection(url, family):
    redirected_link = None
    
    if family == "Android":
        
        if "primary" in url["android"]:
            redirected_link = url["android"]["primary"]
        
        elif "fallback" in url["android"]:
            redirected_link = url["android"]["fallback"]
        
        else:
            return bad_request(Exception("No links provided"))
        
    elif family == "iOS":
        
        if "primary" in url["ios"]:
            redirected_link = url["ios"]["primary"]
        
        elif "fallback" in url["ios"]:
            redirected_link = url["ios"]["fallback"]
        
        else:
            return bad_request(Exception("No links provided"))
        
    else:
        redirected_link = url["web"]
    
    return redirected_link


def determine_device_family(request):
    user_agent_string = request.headers.get('User-Agent')
    user_agent = parse(user_agent_string)
    return user_agent.os.family
