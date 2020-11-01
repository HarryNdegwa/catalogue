from django.contrib import admin

from .models import *

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(ProductImage)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(WishList)
admin.site.register(Contact)