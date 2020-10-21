from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from rest_framework.exceptions import AuthenticationFailed

from datetime import timedelta
from django.utils import timezone
from django.conf import settings

User = get_user_model()


class TokenAuthentication(BaseBackend):

    def authenticate(self, request,token=None):
        if token:
            try:
                res = User.decode_auth_token(token)
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
        

