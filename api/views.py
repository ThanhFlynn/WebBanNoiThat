from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note, Customer
from .serializers import NodeSerializer, CustomerSerializer
from .utils import NoteController, CustomerController

# Create your views here.


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/update/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/delete/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
        {
            'Endpoint': '/accounts/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of account'
        },
        {
            'Endpoint': '/accounts/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/accounts/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/accounts/update/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/accounts/delete/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getNotes(request):

    if request.method == 'GET':
        return NoteController.getNotesList(request)

    if request.method == 'POST':
        return NoteController.createNote(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk):

    if request.method == 'GET':
        return NoteController.getNoteDetail(request, pk)

    if request.method == 'PUT':
        return NoteController.updateNote(request, pk)

    if request.method == 'DELETE':
        return NoteController.deleteNote(request, pk)
    

@api_view(['GET', 'POST'])
def getAccounts(request):

    if request.method == 'GET':
        return CustomerController.getAccountsList(request)

    if request.method == 'POST':
        return CustomerController.createAccount(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getAccount(request, pk):

    if request.method == 'GET':
        return CustomerController.getAccountDetail(request, pk)

    if request.method == 'PUT':
        return CustomerController.updateAccount(request, pk)

    if request.method == 'DELETE':
        return CustomerController.deleteAccount(request, pk)
