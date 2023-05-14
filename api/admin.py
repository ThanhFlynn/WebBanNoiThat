from django.contrib import admin
from decimal import Decimal

# Register your models here.

from .models import User, Categories, Products, Menu, WishList

class UserAdmin(admin.ModelAdmin):
    list_display = ("id","username","email","is_active")
    search_fields = ("username","email")

class CategoriesAdmin(admin.ModelAdmin):
    list_display = ("id","name","menu")
    list_editable = ("name",)
    list_filter = ("menu",)
    search_fields = ("name",)

class MenuAdmin(admin.ModelAdmin):
    list_display = ("__str__","name")
    list_editable = ("name",)
    search_fields = ("name",)

class ProductsAdmin(admin.ModelAdmin):
    list_display = ("name","product_code","img_preview","entry_price_vnd","selling_price_vnd","quantity")
    list_editable = ("quantity",)
    list_filter = ("category",)
    search_fields = ("name", "product_code",)
    readonly_fields = ['img_preview']

    def selling_price_vnd(self, obj: Products) -> str:
        return "{:,}".format(obj.selling_price) + "đ"
    def entry_price_vnd(self, obj: Products) -> str:
        return "{:,}".format(obj.entry_price) + "đ"

class WishListAdmin(admin.ModelAdmin):
    list_display = ("user","products","created")
    list_filter = ("user",)

admin.site.register(User, UserAdmin)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Categories, CategoriesAdmin)
admin.site.register(Products, ProductsAdmin)
admin.site.register(WishList, WishListAdmin)