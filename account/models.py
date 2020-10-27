import jwt,datetime,json

from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser



class CustomUserManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password,**extras):
        if not email:
            raise ValueError("Email is required")
        if not first_name:
            raise ValueError("First name is required")
        if not last_name:
            raise ValueError("Last name is required")
        user = self.model(email=self.normalize_email(email),first_name=first_name,last_name=last_name,**extras)
        user.set_password(password)
        user.save()
        return user


    def create_superuser(self,email,first_name,last_name,password,**extras):
        extras.setdefault('is_admin', True)
        extras.setdefault('is_active', True)

        if extras.get('is_admin') is not True:
            extras.is_admin = True

        return self.create_user(email,first_name,last_name,password,**extras)


def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()




class CustomUser(AbstractBaseUser):
    email = models.CharField(max_length=255,unique=True,null=True)

    USERNAME_FIELD = 'email'

    first_name = models.CharField(max_length=200,null=True)
    last_name = models.CharField(max_length=200,null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['first_name','last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


    def has_perm(self,perm,obj=None):
        return True

    def has_module_perms(self,app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


    def encode_auth_token(self,user_id):
        try:
            payload = {        
                "exp":datetime.datetime.utcnow()+datetime.timedelta(days=0,minutes=10080),
                "iat":datetime.datetime.utcnow(),
                "sub":int(user_id)
            }
            # data = json.dumps(payload,default=myconverter)    
            return jwt.encode(payload,"\xd1\xd7\xee_\xab\xd0UB:\x18\x1bh8\xc8\x90\x0eb+\xc67R\xec^\x90",algorithm="HS256")

        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token,"\xd1\xd7\xee_\xab\xd0UB:\x18\x1bh8\xc8\x90\x0eb+\xc67R\xec^\x90",algorithms=["HS256"])
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Token expired! Please log in again."
        except  jwt.InvalidTokenError:
            return "Invalid Token! Please log in again."



class BuyerDetail(models.Model):
    buyer=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    first_name=models.CharField(max_length=200,null=True)
    last_name=models.CharField(max_length=200,null=True)
    email=models.CharField(max_length=255,null=True)
    phone=models.CharField(max_length=50,null=True)
    city=models.CharField(max_length=100,null=True)
    town=models.CharField(max_length=100,null=True)

    def __str__(self):
        return f"{self.buyer.email} details"


    def save(self,*args,**kwargs):
        self.first_name = self.buyer.first_name
        self.last_name = self.buyer.last_name
        self.email = self.buyer.email
        super().save(*args,**kwargs)
    


class Maintenance(models.Model):
    maintained=models.BooleanField(default=False)

    def __str__(self):
        return self.maintained
