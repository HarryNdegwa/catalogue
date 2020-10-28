from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status

from .models import Maintenance


class ComingSoonMiddleware(object):

    def __init__(self,get_response):
        self.get_response = get_response


    def __call__(self,request):
        under_maintenance = Maintenance.objects.all().filter(maintained=True)
        path = request.get_full_path()
        if under_maintenance and path != "/admin/":
            return JsonResponse({"maintenance":True})
        return self.get_response(request)
