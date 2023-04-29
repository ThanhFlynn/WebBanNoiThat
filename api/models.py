from django.db import models

# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
    
    class Meta:
        ordering = ['-updated', '-created']

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
    name = models.CharField(max_length=255)
    price = models.BigIntegerField()
    size = models.CharField(max_length=50)
    origin = models.CharField(max_length=50, blank=True)
    material = models.CharField(max_length=255)
    image = models.ImageField(upload_to="frontend/src/assets/img/products/", width_field=None, height_field=None, max_length=255)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-updated', '-created']