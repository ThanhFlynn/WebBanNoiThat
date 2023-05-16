from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User, Menu, Categories, Products, WishList, Order, OrderDetail

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

class MenuSerializer(ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class CategoriesSerializer(ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class WishListSerializer(ModelSerializer):
    class Meta:
        model = WishList
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

