from django.shortcuts import redirect
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.core.mail import EmailMessage

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, Menu, Categories, Products, WishList, OrderStatus, Order, OrderDetail
from .utils import UserController
from .serializers import UserSerializer, UserLoginSerializer, MenuSerializer, CategoriesSerializer, ProductsSerializer, WishListSerializer, OrderSerializer, OrderDetailSerializer
from .tokens import account_activation_token
import jwt

from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import Q
from django.conf import settings

import json

# Create your views here.

@api_view(['POST'])
@ensure_csrf_cookie
def UserRegisterView(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        user = serializer.save()

        domain = get_current_site(request).domain
        token = account_activation_token.make_token(user)

        message = """
            <html> 
                <head> 
                </head> 
                <body> 
                    <div> 
                        <h1>Hi, {0}</h1>
                        <h2>Welcome to Furniture website and thank you for registering our website</h2>
                        <br/>
                        <a href='http://{1}/api/accounts/activate?uid={2}&token={3}'>Click here to confirm your email</a> 
                    </div> 
                </body> 
            </html>
        """.format(user.username,domain,user.id,token)

        mail = EmailMessage(
            subject="Activate your account.",
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
            reply_to=[settings.EMAIL_HOST_USER],
        )
        mail.content_subtype = "html"
        mail.send()

        return Response({
            'message': 'Register successful!'
        }, status=status.HTTP_201_CREATED)

    else:
        return Response({
            'error_message': 'Email already exists!',
            'errors_code': 400,
        }, status=status.HTTP_400_BAD_REQUEST)
    
def activate(request):
    try:
        uid = request.GET.get('uid')
        token = request.GET.get('token')
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect('/#/accounts/login/')
    else:
        return redirect('/#/accounts/register/')
    
@api_view(['POST'])
@ensure_csrf_cookie
def UserLoginView(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            if user:
                result = check_password(serializer.validated_data['password'], user.password)
                if result:
                    if user.is_active == True:
                        refresh = TokenObtainPairSerializer.get_token(user)
                        data = {
                            'refresh_token': str(refresh),
                            'access_token': str(refresh.access_token)
                        }
                        return Response(data, status=status.HTTP_200_OK)
                    elif user.is_active == False:
                        return Response({
                            'error_message': 'Please confirm your email',
                            'error_code': 406
                        }, status=status.HTTP_406_NOT_ACCEPTABLE)
                else:
                    return Response({
                        'error_message': 'Email or password is incorrect!',
                        'error_code': 401
                    }, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({
                'error_message': 'Email or password is incorrect!',
                'error_code': 401
            }, status=status.HTTP_401_UNAUTHORIZED)

    return Response({
        'error_messages': serializer.errors,
        'error_code': 400
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def getAccount(request):

    if request.method == 'GET':
        return UserController.getAccountDetail(request)
    
    if request.method == 'PUT':
        return UserController.updateAccount(request)

    if request.method == 'DELETE':
        return UserController.deleteAccount(request)
    
@api_view(['POST'])
@ensure_csrf_cookie
def recoverPassword(request):
    email = request.data["email"]
    try:
        user = User.objects.get(email=email)

        domain = get_current_site(request).domain
        token = account_activation_token.make_token(user)

        message = """
            <html> 
                <head> 
                </head> 
                <body> 
                    <div> 
                        <h1>Hi, {0}</h1>
                        <br/>
                        <a href='http://{1}/#/accounts/recoverPassword/uid={2}&token={3}'>Click here to reset your password</a> 
                    </div> 
                </body> 
            </html>
        """.format(user.username,domain,user.id,token)

        mail = EmailMessage(
            subject="Reset your password.",
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
            reply_to=[settings.EMAIL_HOST_USER],
        )
        mail.content_subtype = "html"
        mail.send()

        return Response({
            'message': 'Link sent successfully!'
        }, status=status.HTTP_200_OK)
    except:
        return Response({
            'error_message': 'This email is not exist!',
            'errors_code': 400,
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@ensure_csrf_cookie
def doRecoverPassword(request):
    password = request.data["password"]
    try:
        uid = request.GET.get('uid')
        token = request.GET.get('token')
        print(uid,token)
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.password = make_password(password)
        user.save()
        return Response({
            'message': 'Reset password successfully!'
        }, status=status.HTTP_200_OK)
    else:
        Response({
            'error_message': 'Something wrong!',
            'errors_code': 400,
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@ensure_csrf_cookie
def changePW(request):
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
        data = request.data
        oldPW = data["oldpassword"]
        newPW = data["newpassword"]
        result = check_password(oldPW, user.password)
        if result:
            user.password = make_password(newPW)
            user.save()
        else:
            return Response({
                'error_messages': "Mật khẩu cũ không chính xác!",
                'error_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'messages': "Thay đổi mật khẩu thành công!",
        }, status=status.HTTP_200_OK)
    except:
        return Response({
            'error_messages': "Something wrong!",
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@ensure_csrf_cookie
def getMenus(request):
    menu = Menu.objects.all()
    serializer = MenuSerializer(menu, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@ensure_csrf_cookie
def getCategories(request):
    categories = Categories.objects.all()
    serializer = CategoriesSerializer(categories, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@ensure_csrf_cookie
def getProducts(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@ensure_csrf_cookie
def getNewTopProducts(request, pk):
    if pk == "Top":
        products = Products.objects.all().order_by('-purchases')[:8]
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)
    elif pk == "New":
        products = Products.objects.all().order_by('-updated')[:12]
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)

@api_view(["GET"])
@ensure_csrf_cookie
def getWishList(request):
    try:
        access_token = request.headers["Authentication"][7:]
        payload = jwt.decode(jwt=access_token, key=settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload["user_id"]
    except:
        return Response({
            'error_messages': "Hết phiên đăng nhập. Vui lòng đăng nhập lại!",
            'error_code': 401
        }, status=status.HTTP_401_UNAUTHORIZED)
    try:
        wishlist = WishList.objects.filter(user = user_id)
        products = Products.objects.filter(pk__in = wishlist.values_list("products"))
        serializer = ProductsSerializer(products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({
            'error_messages': serializer.errors,
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
@ensure_csrf_cookie
def postWishList(request):
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
        data = request.data
        user = User.objects.get(pk=user_id)
        product = Products.objects.get(pk=data["id"])
        try:
            wishlist = WishList.objects.get(user = user_id, products = data["id"])
        except:
            wishlist = None
        if wishlist == None:
            wishlist = WishList(user = user, products = product)
            wishlist.save()

        return Response({
            'message': "Add wishlist successful!"
        }, status=status.HTTP_200_OK)
    except:
        return Response({
            'error_messages': "Something wrong!",
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
@ensure_csrf_cookie
def deleteItemWishList(request):
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
        data = request.data
        try:
            wishlist = WishList.objects.get(user = user_id, products = data["id"])
        except:
            wishlist = None
        if wishlist == None:
            return Response({
                'error_messages': "Something wrong!",
                'error_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            wishlist.delete()
            return Response({
                'message': "Delete this product successful!"
            }, status=status.HTTP_200_OK)
    except:
        return Response({
            'error_messages': "Something wrong!",
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
@ensure_csrf_cookie
def getProductDetail(request):
    try:
        menu_id = request.GET.get("menu_id")
    except:
        menu_id = None
    try:
        cate_id = request.GET.get("cate_id")
    except:
        cate_id = None
    try:
        pro_code = request.GET.get("pro_code")
    except:
        pro_code = None
    
    if pro_code != None:
        try:
            product = Products.objects.get(product_code = pro_code)
            serializer = ProductsSerializer(product, many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response({
                'error_message': "Không tìm thấy sản phẩm mã: " + pro_code,
                'error_code': 404
            }, status=status.HTTP_404_NOT_FOUND)
    elif cate_id != None:
        try:
            products = Products.objects.filter(category = cate_id)
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({
                'error_message': "Không tìm thấy sản phẩm mã thuộc category: " + cate_id,
                'error_code': 404
            }, status=status.HTTP_404_NOT_FOUND)
    else:
        try:
            categories = Categories.objects.filter(menu = menu_id)
            products = Products.objects.filter(category__in = categories.values_list("id"))
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response({
                'error_message': "Không tìm thấy sản phẩm mã thuộc menu: " + menu_id,
                'error_code': 404
            }, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@ensure_csrf_cookie
def searchProduct(request):
    keyword = request.GET.get('keyword')

    products = Products.objects.filter(
        Q(product_code__icontains = keyword) |
        Q(name__icontains = keyword)
    )

    serializer = ProductsSerializer(products, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@ensure_csrf_cookie
def createOrder(request):
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
        total_money = 0
        data = request.data
        orderStatus = OrderStatus.objects.get(id=1)
        for x in data:
            total_money += int(x[0]["selling_price"] * x[1] * 1.02)
        order = Order(user = user, total_money = total_money,ship_address = user.address)
        order.save()
        for x in data:
            product = Products.objects.get(id=x[0]["id"])
            orderDetail = OrderDetail(order=order,products=product,quantity=x[1], created = order.created,status=orderStatus)
            orderDetail.save()
            product.purchases += x[1]
            product.quantity -= x[1]
            product.save()

        return Response({
            'message': "Đặt hàng thành công"
        }, status=status.HTTP_200_OK)
    except:
        return Response({
            'error_messages': "Có lỗi xảy ra",
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@ensure_csrf_cookie
def getConfirmOrder(request):
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
        fro = int(request.GET.get('fro'))
        to = int(request.GET.get('to'))
        statusType = int(request.GET.get('type'))

        orders = Order.objects.filter(user = user_id)
        if statusType == 1:
            orderDetails = OrderDetail.objects.filter(order__in = orders.values_list("id"), status=1).order_by("-created")[fro:to]
        elif statusType == 2:
            orderDetails = OrderDetail.objects.filter(order__in = orders.values_list("id"), status__in = [2,3]).order_by("-created")[fro:to]
        elif statusType == 4:
            orderDetails = OrderDetail.objects.filter(order__in = orders.values_list("id"), status = 4).order_by("-created")[fro:to]
        elif statusType == 5:
            orderDetails = OrderDetail.objects.filter(order__in = orders.values_list("id"), status = 5).order_by("created")[fro:to]

        result = []
        orderDetailsSerializer = OrderDetailSerializer(orderDetails, many=True)

        for x in orderDetailsSerializer.data:
            product = Products.objects.get(pk = x["products"])
            productSerializer = ProductsSerializer(product, many=False)
            result.append([x,productSerializer.data])

        return Response(result, status=status.HTTP_200_OK)
    
    except:
        return Response({
            'error_messages': "Có lỗi xảy ra",
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
@ensure_csrf_cookie
def removeOrderDetail(request):
    data = request.data
    orderStatus = OrderStatus.objects.get(id=5)
    orderDetail = OrderDetail.objects.get(id = data["id"])
    product = Products.objects.get(id = data["products"])
    product.quantity = product.quantity + data["quantity"]
    product.purchases = product.purchases - data["quantity"]
    product.save()
    orderDetail.status = orderStatus
    orderDetail.save()

    return Response({
        'message': "Xóa đơn hàng thành công"
    },status=status.HTTP_200_OK)