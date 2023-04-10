from django.contrib import admin

# Register your models here.

from .models import Note, Customer

admin.site.register(Note)
admin.site.register(Customer)