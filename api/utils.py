from rest_framework.response import Response
from .models import Note, Customer
from .serializers import NodeSerializer, CustomerSerializer

class NoteController:
    def getNotesList(request):
        notes = Note.objects.all()
        serializer = NodeSerializer(notes, many=True)
        return Response(serializer.data)


    def getNoteDetail(request, pk):
        notes = Note.objects.get(id=pk)
        serializer = NodeSerializer(notes, many=False)
        return Response(serializer.data)


    def createNote(request):
        data = request.data
        note = Note.objects.create(
            body=data['body']
        )
        serializer = NodeSerializer(note, many=False)
        return Response(serializer.data)


    def updateNote(request, pk):
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NodeSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()

        return serializer.data


    def deleteNote(request, pk):
        note = Note.objects.get(id=pk)
        note.delete()
        return Response('Note was deleted!')

class CustomerController:
    def getAccountsList(request):
        accounts = Customer.objects.all()
        serializer = CustomerSerializer(accounts, many=True)
        return Response(serializer.data)


    def getAccountDetail(request, pk):
        accounts = Customer.objects.get(id=pk)
        serializer = CustomerSerializer(accounts, many=False)
        return Response(serializer.data)


    def createAccount(request):
        data = request.data
        account = Customer.objects.create(
            userName=data['userName'],
            email=data['email'],
            password=data['password'],
            address_line=data['address_line'],
            telephone=data['telephone']
        )
        serializer = CustomerSerializer(account, many=False)
        return Response(serializer.data)


    def updateAccount(request, pk):
        data = request.data
        account = Customer.objects.get(id=pk)
        serializer = CustomerSerializer(instance=account, data=data)

        if serializer.is_valid():
            serializer.save()

        return serializer.data


    def deleteAccount(request, pk):
        account = Customer.objects.get(id=pk)
        account.delete()
        return Response('Account was deleted!')
