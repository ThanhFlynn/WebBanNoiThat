from rest_framework.response import Response
from .models import Note, User
from .serializers import NoteSerializer, UserSerializer

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

    def getAccountDetail(request, pk):
        accounts = User.objects.get(id=pk)
        serializer = UserSerializer(accounts, many=False)

        #permission_classes = (IsAuthenticated,)

        return Response(serializer.data)

    def updateAccount(request, pk):
        data = request.data
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=data)

        if serializer.is_valid():
            serializer.save()

        return serializer.data


    def deleteAccount(request, pk):
        user = User.objects.get(id=pk)
        user.delete()
        return Response('Account was deleted!')