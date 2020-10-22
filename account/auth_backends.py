from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


class TokenAuthentication(BaseAuthentication):

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if auth_header:
            _,token = auth_header.split(" ")
            res = User.decode_auth_token(token)
            if type(res) == int:
                user = User.objects.get(id=res)
                if user:
                    return (user,None)
            else:
                raise AuthenticationFailed(res)     
        else:
            raise AuthenticationFailed("Invalid Token")

    
    def get_user(self,user_id):
        try:
            user = User.objects.get(id=user_id)
            return user
        except User.DoesNotExist:
            return None


    def authenticate_header(self,request):
        return "Token"
        

