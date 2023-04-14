from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('notes/',views.getNotes, name="notes"),
    path('notes/<str:pk>',views.getNote, name="note"),
    path('accounts/<str:pk>',views.getAccount, name="account"),
    path('accounts/register/',views.UserRegisterView, name="register"),
    path('accounts/login/',views.UserLoginView, name="login")
]
