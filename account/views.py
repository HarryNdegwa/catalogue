from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView
from django.contrib.auth import get_user_model,authenticate
from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework import permissions,status

from .serializers import UserSerializer,BuyerDetailSerializer
from .models import BuyerDetail
from .browsable_mixin import AdminBrowsableMixin

User = get_user_model()


class SignInView(AdminBrowsableMixin,APIView):

    permission_classes = (permissions.AllowAny,)

    authentication_classes = ()


    def post(self,request,format=None):

        data = request.data

        user = authenticate(email=data.get("email",None),password=data.get("password",None))

        if not user:
            return Response({'detail': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)

        token = user.encode_auth_token(user.id)

        user_serialized = UserSerializer(user)

        response=Response({
            'user': user_serialized.data,           
        }, status=status.HTTP_200_OK)
        response.set_cookie("_identity_",token.decode(),max_age=604800,httponly=True)
        lvl = lambda u:1 if u["is_admin"] else 2
        response.set_cookie("lvl",lvl(user_serialized),max_age=604800)
        return response


class CreateUserView(AdminBrowsableMixin,APIView):

    permission_classes = (permissions.AllowAny,)

    authentication_classes = ()

    def post(self,request,format=None):
        user_payload = request.data
        serialized_data = UserSerializer(data=user_payload)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response({},status=status.HTTP_201_CREATED)


class UpdateUserView(AdminBrowsableMixin,RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated)




class UserDetails(AdminBrowsableMixin,APIView):

    # permission_classe = []

    # authentication_classes = []

    def get(self,request,format=None):
        user=User.objects.get(email=request.user)
        # user=User.objects.get(id=1)
        details=BuyerDetail.objects.get(buyer=user)
        serialized_details = BuyerDetailSerializer(details)
        return Response(serialized_details.data,status=status.HTTP_200_OK)

    def put(self,request,format=None):
        user = User.objects.get(email=request.user)
        # user = User.objects.get(id=1)
        details = BuyerDetail.objects.get(buyer=user)
        serialized_details = BuyerDetailSerializer(instance=details,data=request.data,partial=True)
        serialized_details.is_valid(raise_exception=True)
        serialized_details.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)


class CurrentUser(AdminBrowsableMixin,APIView):
    

    def get(self,request,format=None):
        email = request.user
        if email:
            user = User.objects.get(email=email)
            return Response({},status=status.HTTP_200_OK)
        response = Response({},status=status.HTTP_401_UNAUTHORIZED)
        response.delete_cookie("_identity_")
        response.delete_cookie("lvl")
        return response


class LogoutView(AdminBrowsableMixin,APIView):

    def get(self,request,format=None):
        response = Response({},status=status.HTTP_200_OK)
        response.delete_cookie("_identity_")
        response.delete_cookie("lvl")
        return response
