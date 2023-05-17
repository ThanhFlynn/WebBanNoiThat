from django.db import models
from django.utils.safestring import mark_safe
import locale

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=255, null=True, blank=True)
    telephone = models.CharField(max_length=100, null=True, blank=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Menu(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Categories(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Products(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    product_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    selling_price = models.BigIntegerField(blank=False, null=False)
    entry_price = models.BigIntegerField(blank=False, null=False)
    size = models.CharField(max_length=50)
    material = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    warranty = models.CharField(max_length=255,blank=True,null=True)
    description = models.TextField(blank=True,null=True)
    image = models.ImageField(upload_to='images')
    purchases = models.PositiveBigIntegerField(auto_created=True, default=0)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def img_preview(self):
        return mark_safe('<img src = "{url}" width = "200"/>'.format(
             url = self.image.url
         ))


    class Meta:
        ordering = ['-updated', '-created']

class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ForeignKey(Products, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['user']

class OrderStatus(models.Model):
    name = models.CharField(blank=False, null=False, max_length=100)

    def __str__(self):
        return self.name

class Order(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_money = models.BigIntegerField(blank=False, null=False)
    ship_address = models.CharField(max_length=1000, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "DH" + str(self.id)
    
class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    products = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    created = models.DateTimeField()
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE)

    def __str__(self):
        return "OrderDetail " + str(self.id)
