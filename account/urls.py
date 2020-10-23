from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *



urlpatterns = [
    path("login/",SignInView.as_view(),name="login"),
    path("user/create/",CreateUserView.as_view(),name="create_user"),  
    path("user/update/",UpdateUserView.as_view(),name="user_update"),
    path("details/",UserDetails.as_view(),name="fetch_user_details")
]