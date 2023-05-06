from django.db import models

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
    price = models.BigIntegerField(blank=False, null=False)
    size = models.CharField(max_length=50)
    material = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    warranty = models.CharField(max_length=255,blank=True,null=True)
    image = models.ImageField(upload_to='images')
    description = models.TextField(blank=True,null=True)
    purchases = models.PositiveBigIntegerField(auto_created=True, default=0)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-updated', '-created']

class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ForeignKey(Products, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-user']