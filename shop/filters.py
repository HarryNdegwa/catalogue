import django_filters

from django.contrib.auth.models import User

from .models import Product


class ProductFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = Product
        fields = {
            "category":["exact"],
            # "price":["exact","lt","gt"],
            # "timestamp":["exact","year__gt"]
        }


class CartFilter(django_filters.FilterSet):

    @property
    def qs(self):
        parent = super().qs
        buyer = getattr(self.request,"user",None)
        if str(buyer) != "AnonymousUser" and buyer != None:
            return parent.filter(buyer=buyer)
        return parent.filter(buyer=User.objects.get(id=1))



class OrderFilter(django_filters.FilterSet):

    @property
    def qs(self):
        parent = super().qs
        owner = getattr(self.request,"user",None)
        if str(owner) != "AnonymousUser" and owner != None:
            return parent.filter(owner=owner)
        return parent.filter(owner=User.objects.get(id=1))

