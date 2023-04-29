from django.contrib import admin

# Register your models here.

from .models import Note, User, Categories, Products, Menu

admin.site.register(Note)
admin.site.register(User)
admin.site.register(Menu)
admin.site.register(Categories)
admin.site.register(Products)