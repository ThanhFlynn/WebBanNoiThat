from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from .utils import NoteController, UserController
from .serializers import UserSerializer, UserLoginSerializer
from django.contrib.auth.hashers import make_password, check_password

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
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
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
    
@api_view(['POST'])
def UserRegisterView(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        user = serializer.save()
        
        return Response({
            'message': 'Register successful!'
        }, status=status.HTTP_201_CREATED)

    else:
        return Response({
            'error_message': 'This email has already exist!',
            'errors_code': 400,
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def UserLoginView(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        # user = authenticate(
        #     request,
        #     username=serializer.validated_data['email'],
        #     password=serializer.validated_data['password']
        # )
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            if user:
                result = check_password(serializer.validated_data['password'], user.password)
                if result:
                    refresh = TokenObtainPairSerializer.get_token(user)
                    data = {
                        'refresh_token': str(refresh),
                        'access_token': str(refresh.access_token)
                    }
                    return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({
                'error_message': 'Email or password is incorrect!',
                'error_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        'error_messages': serializer.errors,
        'error_code': 400
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def getAccount(request):

    if request.method == 'GET':
        return UserController.getAccountDetail(request)
    
    if request.method == 'PUT':
        return UserController.updateAccount(request)

    if request.method == 'DELETE':
        return UserController.deleteAccount(request)