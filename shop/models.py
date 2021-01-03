from django.db import models
from django.db.models import F
from django.contrib.auth import get_user_model
from django.template.defaultfilters import slugify

User = get_user_model()


class Category(models.Model):
    name=models.CharField(max_length=200)

    class Meta:
        verbose_name_plural="Categories"

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,null=True)
    name=models.CharField(max_length=200)

    class Meta:
        verbose_name_plural="SubCategories"

    def __str__(self):
        return self.name


class Product(models.Model):
    name=models.CharField(max_length=500,null=True)
    price=models.IntegerField(null=True)
    prev_price=models.IntegerField(default=0)
    quantity=models.IntegerField(null=True) 
    category=models.ForeignKey(Category,on_delete=models.CASCADE,null=True) #filter
    sub_category=models.ForeignKey(SubCategory,on_delete=models.CASCADE,null=True) 
    description=models.TextField(null=True)
    timestamp=models.DateTimeField(auto_now_add=True) #pagination
    hot_deal=models.BooleanField(default=False,null=True,blank=True)
    deal_price=models.IntegerField(null=True,blank=True)
    deal_duration=models.IntegerField(null=True,blank=True)
    deal_quantity=models.IntegerField(null=True,blank=True)
    status=models.CharField(max_length=20,default="live")
    published=models.BooleanField(default=False)
    sold=models.IntegerField(default=0,blank=True)
    reviews=models.IntegerField(default=0)
    img_urls=models.TextField(null=True)
    slug=models.SlugField(max_length=200,null=True,blank=True)


    def __str__(self):
        return self.name

    class Meta:
        ordering=["id"]

    
    def save(self,*args,**kwargs):
        self.slug = slugify(f"{self.name} {self.timestamp}")
        super().save(*args,**kwargs)


class Cart(models.Model):
    buyer=models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    product_image_url = models.CharField(max_length=200,null=True)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.buyer.email

    def save(self,*args,**kwargs):
        image_urls = self.product.img_urls.split(",")
        self.product_image_url = image_urls[0]
        if self.product.hot_deal:
            self.total_price = self.product.deal_price*self.quantity
        else:
            self.total_price = self.product.price*self.quantity
        super().save(*args,**kwargs)



class Order(models.Model):
    owner=models.ForeignKey(User,on_delete=models.CASCADE)
    currency=models.CharField(max_length=5,null=True)
    currency_value=models.DecimalField(max_digits=10,decimal_places=6)
    products=models.TextField()
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    payment_method=models.CharField(max_length=100,null=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    status=models.CharField(max_length=20,default="processing")


    def __str__(self):
        return f"{self.owner.email} order on {self.timestamp}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products")


    def __str__(self):
        return self.image.url

    def __del__(self):
        pass


class WishList(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    saver=models.ForeignKey(User,on_delete=models.CASCADE)
    product_image_url=models.CharField(max_length=255,null=True)

    def __str__(self):
        return f"{self.saver.email} saved!"

    class Meta:
        verbose_name_plural="Wishlists"



class Contact(models.Model):
    name=models.CharField(max_length=200)
    email=models.EmailField(max_length=256)
    message=models.TextField()


    def __str__(self):
        return str(self.name)




class Review(models.Model):
    reviewer = models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    content = models.TextField()
    stars = models.IntegerField(default=0)
    published = models.BooleanField(default=False)
    timestamp = models.DateField(auto_now_add=True)


    def __str__(self):
        return self.content




    