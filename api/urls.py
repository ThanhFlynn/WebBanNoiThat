from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('notes/',views.getNotes, name="notes"),
    path('notes/<str:pk>',views.getNote, name="note"),
    path('accounts/detail/',views.getAccount, name="account"),
    path('accounts/register/',views.UserRegisterView, name="register"),
    path('accounts/login/',views.UserLoginView, name="login"),
    path('accounts/activate',views.activate, name="activate"),
    path('accounts/recoverPassword/',views.recoverPassword, name="recoverPassword"),
    path('accounts/doRecoverPassword',views.doRecoverPassword, name="doRecoverPassword"),
    path('accounts/changePW/',views.changePW, name="changePW"),
    path('getMenus/',views.getMenus, name="getMenus"),
    path('getCategories/',views.getCategories, name="getCategories"),
    path('getProducts/',views.getProducts, name="getProducts"),
]
