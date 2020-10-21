from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


class TokenAuthentication(BaseBackend):

    def authenticate(self, request,token=None):
        auth_header = request.headers["Authorization"]
        _,token = auth_header.split(" ")
        if token:
            try:
                res = User.decode_auth_token(token)
                print(f"Res is {res}")
                if type(res) == int:
                    return res
                else:
                    raise AuthenticationFailed(res)
            except:
                raise AuthenticationFailed("Invalid Token")
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
        

