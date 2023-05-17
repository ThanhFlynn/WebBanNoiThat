from django.contrib import admin

# Register your models here.

from .models import User, Categories, Products, Menu, WishList, OrderStatus, Order, OrderDetail

class UserAdmin(admin.ModelAdmin):
    list_select_related = True
    list_display = ("id","username","email","is_active")
    search_fields = ("username","email")

class CategoriesAdmin(admin.ModelAdmin):
    list_select_related = True
    list_display = ("id","name","menu")
    list_editable = ("name",)
    list_filter = ("menu",)
    search_fields = ("name",)

class MenuAdmin(admin.ModelAdmin):
    list_select_related = True
    list_display = ("__str__","name")
    list_editable = ("name",)
    search_fields = ("name",)

class ProductsAdmin(admin.ModelAdmin):
    list_select_related = True
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
    list_select_related = True
    list_display = ("user","products","created")
    list_filter = ("user",)

class OrderDetailAdmin(admin.ModelAdmin):
    list_select_related = True
    list_display = ("name_oder_detail","order","products","quantity","date_created","status")
    list_editable = ("status",)
    search_fields = ("order","products")
    list_filter = ("order",)

    def name_oder_detail(self, obj: OrderDetail) -> str:
        return "OrderDetail " + str(obj.id)
    
    def date_created(self, obj: OrderDetail) -> str:
        return obj.created.strftime("%d-%m-%Y %H:%M:%S")
    
class OrderItemInline(admin.TabularInline):
    model = OrderDetail
    extra = 0
    list_display = ("products", "quantity","status")
    readonly_fields = ("products", "quantity")

class OrderAdmin(admin.ModelAdmin):
    list_display = ("__str__","user","price_vnd","ship_address","date")
    list_filter = ("user",)
    date_hierarchy = ('created')

    inlines = [OrderItemInline, ]

    def price_vnd(self, obj: Order) -> str:
        return "{:,}".format(obj.total_money) + "đ"
    
    def date(self, obj: Order) -> str:
        return obj.created.strftime("%d-%m-%Y %H:%M:%S")



admin.site.register(User, UserAdmin)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Categories, CategoriesAdmin)
admin.site.register(Products, ProductsAdmin)
admin.site.register(WishList, WishListAdmin)
admin.site.register(OrderStatus)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
