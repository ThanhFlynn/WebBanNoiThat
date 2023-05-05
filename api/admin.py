from django.contrib import admin

# Register your models here.

from .models import User, Categories, Products, Menu, WishList

admin.site.register(User)
admin.site.register(Menu)
admin.site.register(Categories)
admin.site.register(Products)
admin.site.register(WishList)