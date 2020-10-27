from rest_framework.response import Response
from rest_framework import status

from .models import Maintenance


class ComingSoonMiddleware(object):

    def __init__(self,get_response):
        self.get_response = get_response


    def __call__(self,request):
        response = get_response(request)
        return response


    def process_view(self,request,view_func,view_args,view_kwargs):
        under_maintenance = Maintenance.objects.all().filter(maintained=True)
        if under_maintenance:
            return Response({"maintenance":True},status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return 
