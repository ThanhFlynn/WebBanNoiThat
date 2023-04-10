from rest_framework.serializers import ModelSerializer
from .models import Note, Customer
from django import forms

class NodeSerializer(ModelSerializer):
    class Meta:
        model = Note 
        fields = '__all__'
        
class CustomerSerializer(ModelSerializer):
    password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = Customer
        fields = '__all__'