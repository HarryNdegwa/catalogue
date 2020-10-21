import datetime
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import BuyerDetail




User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('first_name','last_name','email', 'password','is_admin')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self,validated_data):
        password = validated_data.pop("password",None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class BuyerDetailSerializer(serializers.ModelSerializer):
    buyer=UserSerializer()
    class Meta:
        model=BuyerDetail
        fields="__all__"
