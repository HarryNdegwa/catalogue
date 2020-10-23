import json
from django.db.models import F
from rest_framework.views import APIView
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.generics import *
from rest_framework.parsers import FileUploadParser
from django_filters import rest_framework as filters
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model

from .serializers import *
from .models import *
from .pagination_mixin import PaginationMixin
from .filters import ProductFilter,CartFilter,OrderFilter
from account.serializers import UserSerializer


User = get_user_model()


def is_admin(email):
    try:
        user = User.objects.get(email = email)
        return user.is_admin
    except User.DoesNotExist:
        return False


class ProductListCreateView(APIView,PaginationMixin):

    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    permission_classes = []

    authentication_classes = []

    def post(self,request,format=None):
        payload = request.data
        serialized_data = ProductSerializer(data=payload)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data,status=status.HTTP_201_CREATED)


    def get(self,request,format=None):
        queryset = Product.objects.filter(published=True)
        page = self.paginate_queryset(queryset)
        serialized_products = ProductSerializer(page,many=True)
        if page is not None:
            serialized_products = ProductSerializer(page,many=True)
            return self.get_paginated_response(serialized_products.data)
        return Response(serialized_products.data,status=status.HTTP_200_OK)



class ProductCategoryListView(APIView,PaginationMixin):

        pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

        permission_classes = []

        authentication_classes = []

        def get(self,request,category,format=None):
            category = Category.objects.get(name=category)
            queryset = Product.objects.filter(category=category)
            page = self.paginate_queryset(queryset)
            serialized_products = ProductSerializer(page,many=True)
            if page is not None:
                return self.get_paginated_response(serialized_products.data)
            return Response(serialized_products.data,status=status.HTTP_200_OK)


class ProductFetchRelated(APIView):

    permission_classes = []

    authentication_classes = []

    def get(self,request,slug,format=None):
        category = Product.objects.get(slug=slug).category
        related_products = Product.objects.filter(category=category).exclude(slug=slug)
        serialized_products = ProductSerializer(related_products,many=True)
        return Response(serialized_products.data,status=status.HTTP_200_OK)
        



class ProductRetrieveView(APIView):

    permission_classes = []

    authentication_classes = []

    def get_product(self,slug):
        try:
            product = Product.objects.get(slug=slug)
            return product
        except:
            return None #give a 404

    def get(self,request,slug,format=None):
        product = self.get_product(slug)
        if product:
            serialized_product = ProductSerializer(product)
            return Response(serialized_product.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    


class ProductUpdateDestroyView(APIView):

    def put(self,request,id,format=None):
        if is_admin(request.user):
            product = Product.objects.get(id=id)
            if request.data.get("type") == "deal":
                data = request.data
                data["hot_deal"] = True
                serialized_product = ProductSerializer(instance=product,data=data,partial=True)
            else: 
                print("Hellooo")
                serialized_product = ProductSerializer(instance=product,data=request.data,partial=True)
            serialized_product.is_valid(raise_exception=True)
            serialized_product.save()
            return Response(serialized_product.data,status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)


class DeleteProductImage(APIView):

    def put(self,request,id,format=None):
        raw_saved_image = "/".join(request.data["url"].split("/")[-3:])
        saved_image = f"/{raw_saved_image}"
        product = Product.objects.get(id=id)
        img_urls = product.img_urls.split(",")
        try:
            img_urls.remove(saved_image)
            product.img_urls = ",".join(img_urls)
            product.save()
        except Exception as e:
            product.save()
        return Response({},status=status.HTTP_200_OK)




class CartListCreateView(APIView,PaginationMixin):

    permission_classes = (permissions.IsAuthenticated,)

    def process_cart_product_duplicates_same_buyer(self,obj,payload,qty):
        buyer = User.objects.get(id=payload["buyer"]["id"])
        product = Product.objects.get(id=payload["product"]["id"])
        cart = Cart.objects.filter(buyer=buyer,product=product)
        if cart.exists():
            cart = Cart.objects.get(buyer=buyer,product=product)
            cart.quantity = int(cart.quantity)+int(qty)
            cart.save()
        else:
            obj.is_valid(raise_exception=True)
            obj.save()




    def post(self,request,format=None):
        user = User.objects.get(email=request.user)
        if type(request.data) == dict:
            payload = request.data
            qty=payload["quantity"]
            payload["buyer"]={"id":user.id,"password":user.password}
            serialized_cart = CartSerializer(data=payload)
            self.process_cart_product_duplicates_same_buyer(serialized_cart,payload,qty)
            return Response({"count":qty},status=status.HTTP_201_CREATED)
        elif type(request.data) == list:
            # if request.data == []:
            #     return Response(status=status.HTTP_200_OK)
            for item in request.data:
                qty=item["quantity"]
                item["buyer"]={"id":user.id,"password":user.password}
                serialized_cart = CartSerializer(data=item)
                self.process_cart_product_duplicates_same_buyer(serialized_cart,item,qty)

            return Response(status=status.HTTP_201_CREATED)

    def get(self,request,format=None):
        print(dir(request))
        print(request.auth)
        print(request.user)
        user = User.objects.get(email=request.user)
        cart_items = Cart.objects.filter(buyer=user)
        serialized_items = CartSerializer(cart_items,many=True)
        return Response(serialized_items.data,status=status.HTTP_200_OK)


    def put(self,request,format=None):
        """
        The only thing to update in cart is quantity which in turn updates total price
        """
        op_type = request.data["op_type"]
        cart = Cart.objects.get(id=request.data["id"])
        if op_type == "INC":
            cart.quantity+=1
        elif op_type == "DEC" and cart.quantity > 1:
            cart.quantity-=1
        cart.save()
        serialized_cart = CartSerializer(cart)
        return Response(serialized_cart.data,status=status.HTTP_200_OK)

    def delete(self,request,id,format=None):
        """
        Delete a cart record
        """
        cart = Cart.objects.get(id=id)
        quantity = cart.quantity
        cart.delete()
        return Response({"id":id,"qty":quantity},status=status.HTTP_200_OK)



class WishListCreateListView(APIView):


    def process_wishlist_product_duplicates_same_buyer(self,obj,payload):
        saver = User.objects.get(id=payload["saver"]["id"])
        product = Product.objects.get(name=payload["product"]["name"])
        wishlist = WishList.objects.filter(saver=saver,product=product)
        if wishlist.exists():
            wishlist = WishList.objects.get(saver=saver,product=product)
            # wishlist.quantity = int(wishlist.quantity)+int(qty)
            wishlist.save()
        else:
            obj.is_valid(raise_exception=True)
            obj.save()

    def get(self,request,format=None):
        wishlist_items = WishList.objects.filter(saver=User.objects.get(email=request.user))
        serialized_wishlist = WishListSerializer(wishlist_items,many=True)
        return Response(serialized_wishlist.data,status=status.HTTP_200_OK)

    def post(self,request,format=None):
        if type(request.data) == dict:
            payload=request.data
            product=Product.objects.get(id=request.data["id"])
            payload["product"] = {"name":product.name}
            user = User.objects.get(email=request.user)
            payload["saver"] = {"id":user.id,"password":user.password}
            payload.pop("id")
            serialized_wishlist = WishListSerializer(data=payload)
            self.process_wishlist_product_duplicates_same_buyer(serialized_wishlist,payload)
            wishlist_items = WishList.objects.filter(saver=user)
            return Response({"count":len(wishlist_items)},status=status.HTTP_201_CREATED)
        elif type(request.data) == list:
            for item in request.data:
                product=Product.objects.get(id=item["id"])
                item["product"] = {"name":product.name}
                user = User.objects.get(email=request.user)
                item["saver"] = {"id":user.id,"password":user.password}
                item.pop("id")
                serialized_wishlist = WishListSerializer(data=item)
                self.process_wishlist_product_duplicates_same_buyer(serialized_wishlist,item)

            wishlist_items = WishList.objects.filter(saver=user)
            return Response({"count":len(wishlist_items)},status=status.HTTP_201_CREATED)

    def delete(self,request,id,format=None):
        to_delete = WishList.objects.get(id=id)
        to_delete.delete()
        return Response({"id":id},status=status.HTTP_200_OK)





class GetCartCount(APIView):

    def get(self,request,format=None):
        qty=0
        user = User.objects.get(email=request.user)
        cart_items = Cart.objects.filter(buyer=user)
        for item in cart_items:
            qty+=item.quantity
        return Response({"count":qty},status=status.HTTP_200_OK)



class WishListCount(APIView):

    def get(self,request,format=None):
        qty=0
        user = User.objects.get(email=request.user)
        wishlist_items = WishList.objects.filter(saver=user)
        return Response({"count":len(wishlist_items)},status=status.HTTP_200_OK)




class OrderListCreateView(APIView):

    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filterset_class = OrderFilter

    def get(self,request,format=None):
        q = Order.objects.all()
        serialized_q = OrderSerializer(q,many=True)
        return Response(serialized_q.data,status=status.HTTP_200_OK)




class AllOrdersListView(ListAPIView):  #for admin
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()



class UploadProductImageView(APIView):

    parser_class = (FileUploadParser,)

    def post(self,request,format=None):
        serialized_product_image = ProductImageSerializer(data=request.data)
        serialized_product_image.is_valid(raise_exception=True)
        serialized_product_image.save()
        return Response(serialized_product_image.data,status=status.HTTP_201_CREATED)



class CategoriesView(ListAPIView):

    permission_classes = []

    authentication_classes = []

    def get(self,request,format=None):
        sub_categories = SubCategory.objects.all()
        serialized_categories = SubCategorySerializer(sub_categories,many=True)
        return Response(serialized_categories.data,status=status.HTTP_200_OK)



class DealsView(APIView):

    permission_classes = []

    authentication_classes = []

    def get(self,request,format=None):
        deal_products = Product.objects.filter(hot_deal = True)
        serialized_products = ProductSerializer(deal_products,many=True)
        return Response(serialized_products.data,status=status.HTTP_200_OK)




