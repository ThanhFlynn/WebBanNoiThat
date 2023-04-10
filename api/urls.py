from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('notes/',views.getNotes, name="notes"),
    path('notes/<str:pk>',views.getNote, name="note"),
    path('account/', views.getAccounts, name="accounts"),
    path('account/<str:pk>', views.getAccount, name="account")
]
