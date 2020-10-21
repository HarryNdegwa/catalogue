from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from .models import BuyerDetail


@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def user_secondary(sender,instance,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)
        BuyerDetail.objects.create(buyer=instance)


        