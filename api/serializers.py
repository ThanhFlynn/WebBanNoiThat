from rest_framework.serializers import ModelSerializer
from .models import Note

class NodeSerializer(ModelSerializer):
    class Meta:
        model = Note 
        fields = '__all__'