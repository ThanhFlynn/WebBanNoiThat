from rest_framework import status
from rest_framework.response import Response
from .models import Note, User
from .serializers import NoteSerializer, UserSerializer
import jwt
from WebBanNoiThat import settings

class NoteController:
    def getNotesList(request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)


    def getNoteDetail(request, pk):
        notes = Note.objects.get(id=pk)
        serializer = NoteSerializer(notes, many=False)
        return Response(serializer.data)


    def createNote(request):
        data = request.data
        note = Note.objects.create(
            body=data['body']
        )
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)

    def updateNote(request, pk):
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()

        return serializer.data


    def deleteNote(request, pk):
        note = Note.objects.get(id=pk)
        note.delete()
        return Response('Note was deleted!')
    
class UserController:

    def getAccountDetail(request):
        try:
            access_token = request.headers["Authentication"][7:]
            payload = jwt.decode(jwt=access_token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload["user_id"]
        except:
            return Response({
                'error_messages': "Something wrong!",
                'error_code': 401
            }, status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user, many=False)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({
                'error_messages': serializer.errors,
                'error_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)

    def updateAccount(request):
        data = request.data
        try:
            access_token = request.headers["Authentication"][7:]
            payload = jwt.decode(jwt=access_token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload["user_id"]
        except:
            return Response({
                'error_messages': "Something wrong!",
                'error_code': 401
            }, status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(instance=user, data=data)
            if serializer.is_valid():
                serializer.save()
            return Response({
                'messages': "Account update successful!",
            }, status=status.HTTP_200_OK)
        except:
            return Response({
                'error_messages': serializer.errors,
                'error_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)

    def deleteAccount(request):
        access_token = request.headers["Authentication"][7:]
        payload = jwt.decode(jwt=access_token, key=settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload["user_id"]
        user = User.objects.get(id=user_id)
        user.delete()
        return Response('Account was deleted!')