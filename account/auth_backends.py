from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


class TokenAuthentication(BaseAuthentication):

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
            except Exception as e:
                print(e)
                raise AuthenticationFailed("Invalid Token")
        else:
            raise AuthenticationFailed("Invalid Token")

    
    def authenticate_credentials(self, token):
        model = self.get_model()
        payload = jwt.decode(token, "SECRET_KEY")
        email = payload['email']
        userid = payload['id']
        msg = {'Error': "Token mismatch",'status' :"401"}
        try:
            
            user = User.objects.get(
                email=email,
                id=userid,
                is_active=True
            )
            
            if not user.token['token'] == token:
                raise exceptions.AuthenticationFailed(msg)
               
        except jwt.ExpiredSignature or jwt.DecodeError or jwt.InvalidTokenError:
            return HttpResponse({'Error': "Token is invalid"}, status="403")
        except User.DoesNotExist:
            return HttpResponse({'Error': "Internal server error"}, status="500")

        return (user, token)

    def authenticate_header(self, request):
        return 'Token'

