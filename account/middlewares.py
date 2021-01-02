from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status

from .models import Maintenance
from .currency import currencies as c

currencies = c()


class ComingSoonMiddleware(object):

    def __init__(self,get_response):
        self.get_response = get_response


    def __call__(self,request):
        under_maintenance = Maintenance.objects.all().filter(maintained=True)
        path = request.get_full_path()
        if under_maintenance and "/admin/" not in path:
            return JsonResponse({"maintenance":True},status=503)
        return self.get_response(request)


class CurrencyMiddleware(object):

    def __init__(self,get_response):
        self.get_response = get_response

    def __call__(self,request):
        currency = request.headers.get("CURRENCY")
        if currency:
            try:
                currency_value = currencies[currency]
            except KeyError:
                currency_value = currencies["KSH"]
                response = self.get_response(request)
                response["CURRENCY"] = currency_value
                return response
            else:
                response = self.get_response(request)
                response["CURRENCY"] = currency_value  
                return response
        else:
            response = self.get_response(request)
            return response