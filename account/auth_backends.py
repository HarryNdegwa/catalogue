from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from .utility import SecretUtility


secret_utility = SecretUtility()


#this return left time
def expires_in(token):
    time_elapsed = timezone.now() - token.created
    
    left_time = timedelta(seconds = settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed
    return left_time

# token checker if token expired or not
def is_token_expired(token):
    return expires_in(token) < timedelta(seconds = 0)

# if token is expired new token will be established
# If token is expired then it will be removed
# and new one with different key will be created
def token_expire_handler(token,user):
    is_expired = is_token_expired(token)
    if is_expired:
        token.delete()
        try:
            token = Token.objects.create(user = user)
        except:
            token.delete()
            token = Token.objects.create(user = user)
    return is_expired, token




class ExpiringTokenAuthentication(TokenAuthentication):
    """
    If token is expired then it will be removed
    and new one with different key will be created
    """
    def authenticate_credentials(self, key):
        # key = secret_utility.decrypt_message(key)
        # print(f"Key is {key}")
        try:
            token = Token.objects.get(key = key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid Token")
        
        # if not token.user.is_active:
        #     raise AuthenticationFailed("User is not active")

        user=token.user
        is_expired, token = token_expire_handler(token,user)
        if is_expired:
            raise AuthenticationFailed("The Token is expired")
        
        return (token.user, token)


# class EmailAuthBackend(BaseBackend):
#     """
#     Custom Email Backend to perform authentication via email
#     """

#     def authenticate(self,request, email=None, password=None, **kwargs):
#         # print(username)
#         user_model = get_user_model()
#         try:
#             user = user_model.objects.get(email=email)
#             if user.check_password(password):
#                 return user
#             return None
#         except user_model.DoesNotExist:
#             return None

#     def get_user(self,user_id):
#         user_model = get_user_model()
#         try:
#             return user_model.objects.get(id=user_id)
#         except  user_model.DoesNotExist:
#             return None