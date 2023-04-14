from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Note, User

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note 
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': False}}
        
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)