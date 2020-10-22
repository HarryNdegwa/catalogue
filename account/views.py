from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView
from django.contrib.auth import get_user_model,authenticate
from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework import permissions,status

from .serializers import UserSerializer,BuyerDetailSerializer
from .models import BuyerDetail

User = get_user_model()


class SignInView(APIView):

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
        response.set_cookie("id",token.decode())
        return response


class CreateUserView(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self,request,format=None):
        user_payload = request.data
        serialized_data = UserSerializer(data=user_payload)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        user = User.objects.get(email=user_payload.get("email",None))
        token = Token.objects.get(user=user)
        return Response({"token":token.key},status=status.HTTP_201_CREATED)


class UpdateUserView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    lookup_field = "id"
    permission_classes = (permissions.IsAuthenticated)




class UserDetails(APIView):

    def get(self,request,format=None):
        user=User.objects.get(email=request.user)
        details=BuyerDetail.objects.get(buyer=user)
        serialized_details = BuyerDetailSerializer(details)
        return Response(serialized_details.data,status=status.HTTP_200_OK)

    def put(self,request,format=None):
        user = User.objects.get(email=request.user)
        details = BuyerDetail.objects.get(buyer=user)
        serialized_details = BuyerDetailSerializer(instance=details,data=request.data,partial=True)
        serialized_details.is_valid(raise_exception=True)
        serialized_details.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)




class FetchUser(APIView):

    def get(self,request,format=None):
        user_email = request.user
        if request.auth:
            try:
                user = User.objects.get(email=user_email)
                return Response({"is_auth":True,"is_admin":user.is_admin},status=status.HTTP_200_OK)
            except:
                return Response({"is_auth":False,"is_admin":False},status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({"is_auth":False,"is_admin":False},status=status.HTTP_401_UNAUTHORIZED)


