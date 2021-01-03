from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import *
from .custom_image import Base64ImageField
from account.serializers import UserSerializer

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    # sub_category = SubCategoriesSerializer()
    class Meta:
        model=Category
        fields = ["id","name"]


class SubCategorySerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    class Meta:
        model=SubCategory
        fields = ["id","category","name"]
        depth=2


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(required=False)
    sub_category = SubCategorySerializer(required=False)


    class Meta:
        model=Product
        fields="__all__"
        depth=1


    def create(self,validated_data):
        category_data = validated_data.pop("category")
        category = Category.objects.get(name=category_data["name"])
        sub_category_data = validated_data.pop("sub_category")
        sub_category = SubCategory.objects.get(name=sub_category_data["name"])
        product = Product.objects.create(category=category,sub_category=sub_category,**validated_data)
        return product


    def update(self,instance,validated_data):
        if len(validated_data.keys()) == 4:
            instance.hot_deal = True
            instance.deal_price = validated_data.get("deal_price",instance.deal_price)
            instance.deal_duration = validated_data.get("deal_duration",instance.deal_duration)
            instance.deal_quantity = validated_data.get("deal_quantity",instance.deal_quantity)
            instance.status = "deal"
            instance.save()
            return instance
        else:    
            try:
                category_data = validated_data.pop("category")
                category = Category.objects.get(name=category_data["name"])
                sub_category_data = validated_data.pop("sub_category")
                sub_category = SubCategory.objects.get(name=sub_category_data["name"])
                instance.name = validated_data.get("name",instance.name)
                instance.price = validated_data.get("price",instance.price)
                instance.prev_price = validated_data.get("prev_price",instance.prev_price)
                instance.quantity = validated_data.get("quantity",instance.quantity)
                instance.category = category
                instance.sub_category = sub_category
                instance.description = validated_data.get("description",instance.description)
                instance.timestamp = validated_data.get("timestamp",instance.timestamp)
                instance.hot_deal = validated_data.get("hot_deal",instance.hot_deal)
                instance.deal_price = validated_data.get("deal_price",instance.deal_price)
                instance.deal_duration = validated_data.get("deal_duration",instance.deal_duration)
                instance.deal_quantity = validated_data.get("deal_quantity",instance.deal_quantity)
                instance.status = validated_data.get("status",instance.status)
                instance.published = validated_data.get("published",instance.published)
                instance.sold = validated_data.get("sold",instance.sold)
                instance.reviews = validated_data.get("reviews",instance.reviews)
                instance.img_urls = validated_data.get("img_urls",instance.img_urls)
                instance.slug = validated_data.get("slug",instance.slug)
                instance.save()
                return instance
            except KeyError: 
                instance.description = validated_data.get("description",instance.description)
                instance.save()
                return instance


class SimpleProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(required=False)

    class Meta:
        model=Product
        fields=["id","name","price","prev_price","category","hot_deal","deal_price","img_urls","slug"]




class CartSerializer(serializers.ModelSerializer):
    buyer = UserSerializer()
    product = SimpleProductSerializer()

    class Meta:
        model=Cart
        fields="__all__"
        depth=2

    def create(self,validated_data):
        user_data = validated_data.pop("buyer")["password"]
        user = User.objects.get(password=user_data)
        product_name = validated_data.pop("product")["name"]
        product = Product.objects.get(name=product_name)
        cart = Cart.objects.create(buyer=user,product=product,**validated_data)
        return cart


class WishListSerializer(serializers.ModelSerializer):
    product=ProductSerializer()
    saver=UserSerializer()

    class Meta:
        model=WishList
        fields="__all__"
        depth=2

    def create(self,validated_data):
        user_data = validated_data.pop("saver")["password"]
        user=User.objects.get(password=user_data)
        product_id = validated_data.pop("product")["name"]
        product=Product.objects.get(name=product_id)
        wishlist = WishList.objects.create(saver=user,product=product,product_image_url=validated_data["product_image_url"])
        return wishlist


    

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model=Order
        exclude=["owner"]


class SimpleOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model=Order
        fields=["id","timestamp"]



class ProductImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model=ProductImage
        fields=["id","image","product"]


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model=Contact
        fields="__all__"


class ReviewSerializer(serializers.ModelSerializer):

    reviewer = UserSerializer()
    product = SimpleProductSerializer()

    class Meta:
        model = Review
        fields = "__all__"


    def create(self,validated_data):
        user_data = validated_data.pop("reviewer")
        user = User.objects.get(password=user_data.get("password"))
        product_data = validated_data.pop("product")
        product = Product.objects.get(slug=dict(product_data).get("slug"))
        review = Review.objects.create(reviewer=user,product=product,**validated_data)
        return review







