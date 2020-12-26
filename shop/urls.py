from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from .views import *


urlpatterns = [
    path("products/",ProductListCreateView.as_view(),name="products"),
    path("search/",ProductSearchView.as_view(),name="products_search"),
    path("products/<str:category>/",ProductCategoryListView.as_view(),name="products_category"),
    path("product/<int:id>/",ProductUpdateDestroyView.as_view(),name="product"),
    path("product/<str:slug>/",ProductRetrieveView.as_view(),name="product"),  
    path("delete/image/<int:id>/",DeleteProductImage.as_view(),name="delete_product_image"),
    path("product/related/<str:slug>/",ProductFetchRelated.as_view(),name="product_related"),
    path("cart/",CartListCreateView.as_view(),name="cart_items"),
    path("cart/<int:id>/",CartListCreateView.as_view(),name="cart_delete"),
    path("cart/count/",GetCartCount.as_view(),name="cart_count"),
    path("orders/",OrderListCreateView.as_view(),name="orders"),
    path("all-orders/",AllOrdersListView.as_view(),name="all_orders"),
    path("upload/",UploadProductImageView.as_view(),name="upload_product_image"),
    path("categories/",CategoriesView.as_view(),name="categories"),
    path("wishlist/",WishListCreateListView.as_view(),name="wishlist"),
    path("wishlist/<int:id>/",WishListCreateListView.as_view(),name="wishlist"),
    path("wishlist/count/",WishListCount.as_view(),name="wishlist_count"),
    path("deals/",DealsView.as_view(),name="deals"),
    path("contact/",ContactView.as_view(),name="contact")
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)