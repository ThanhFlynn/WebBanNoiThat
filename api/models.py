from django.db import models
from django import forms

# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
    
    class Meta:
        ordering = ['-updated', '-created']

class Customer(models.Model):
    userName = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    address_line = models.CharField(max_length=255)
    telephone = models.CharField(max_length=100)

    def __str__(self):
        return self.userName