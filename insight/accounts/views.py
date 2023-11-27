from django.shortcuts import render,redirect
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView,ListAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.conf import settings
import stripe
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.urls import reverse
from django.http import HttpResponse, HttpResponseBadRequest
from django.http import JsonResponse

from decimal import Decimal



stripe.api_key=settings.STRIPE_SECRET_KEY



SITE_URL='http://localhost:5173/'

class SingleUserInfo(RetrieveUpdateDestroyAPIView):
    queryset=User.objects.all()
    serializer_class=UserInfoSerializer


class CreateSkills(ListCreateAPIView):
    queryset=Skills.objects.all()
    serializer_class = SkillSerializer
    # permission_classes = [IsAuthenticated]

class ListSkills(ListAPIView):
    serializer_class=SkillSerializer
    

    def get_queryset(self):
        user_id=self.kwargs.get('user_id')
        queryset=Skills.objects.filter(user_id=user_id)

        return queryset



class SkillView(RetrieveUpdateDestroyAPIView):
    queryset=Skills.objects.all()
    serializer_class=SkillSerializer


class NotificationsListCreate(ListCreateAPIView):
    queryset=Notifications.objects.all()
    serializer_class=NotificationSerializer

class Notificationbyuser(ListAPIView):
    serializer_class=NotificationSerializer

    def get_queryset(self):
        user_id=self.kwargs.get('user_id')
        queryset=Notifications.objects.filter(user=user_id,is_read=False).order_by('-created_at')

        return queryset




class SubscriptionList(ListCreateAPIView):
    queryset=Subscription.objects.all()
    serializer_class=SubscriptionSerializer

    def perform_create(self, serializer):
        subscription_amount=serializer.validated_data['subscription_amount']

        recieved_amount=Decimal('0.6') * subscription_amount
        subscription=serializer.save()

        subscribed_to_user=subscription.subscribed_to
        subscribed_to_user.wallet_balance += recieved_amount
        subscribed_to_user.save()


        subscribed_to_wallet=Wallet.objects.create(user_id=subscription.subscribed_to,recieved=recieved_amount)
       
        subscribed_to_wallet.save()

        admin_user=User.objects.get(role='admin')
        admin_user.wallet_balance += subscription_amount - recieved_amount
        admin_user.save()

        admin_wallet=Wallet.objects.create(
            user_id=admin_user,
            recieved=subscription_amount-recieved_amount
        )
       

        admin_wallet.save()
    
    def create(self, request, *args, **kwargs):
        
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers=self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)










class SubscriptionListByUser(ListAPIView):
    serializer_class=SubscriptionlistSerializer
    
    def get_queryset(self):
        return Subscription.objects.filter(subscriber=self.kwargs['user_id'])
         
class SubscribersListByUser(ListAPIView):
    serializer_class=SubscriptionlistSerializer

    def get_queryset(self):
        return Subscription.objects.filter(subscribed_to=self.kwargs['user_id'])


class IsSubscriber(APIView):

    def get(self,request,user_id,blog_author, *args, **kwargs):
        print(user_id,blog_author,'is subscriberrrrrrr')
        try:
            is_subscriber=Subscription.objects.filter(subscriber=user_id,subscribed_to=blog_author,is_active=True).exists()

            return Response({"is_subscriber":is_subscriber},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class FollowingsCreate(ListCreateAPIView):
    queryset=Followings.objects.all()
    serializer_class=FollowingsSerializers


class Unfollow(RetrieveUpdateDestroyAPIView):
    queryset=Followings.objects.all()
    serializer_class=FollowingsSerializers

    def destroy(self, request, *args, **kwargs):
        try:
           
            following_inst=Followings.objects.get(follower=self.kwargs['follower_id'],following=self.kwargs['following_id'])
            self.perform_destroy(following_inst)

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Followings.DoesNotExist:
            return Response({"error":"Following not found"},status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class Isfollowing(APIView):

    def get(self,request,follower_id,following_id,*args,**kwargs):
        try:
            is_follower=Followings.objects.filter(follower=follower_id,following=following_id).exists()

            return Response({'is_follower':is_follower},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FollowingsList(ListAPIView):
    serializer_class=FollowinglistSerializer
    
    def get_queryset(self):
        user_id=self.kwargs['user_id']
        return Followings.objects.filter(follower=user_id)

class FollowersList(ListAPIView):
    serializer_class=FollowinglistSerializer

    def get_queryset(self):
        
        user_id=self.kwargs['user_id']
        return Followings.objects.filter(following=user_id)

class CreateWallet(ListCreateAPIView):
    serializer_class=Walletserializer
    queryset=Wallet.objects.all()



    

#----------------payment STRIPE------------------------------

# @method_decorator(csrf_exempt, name='dispatch')
class CreateCheckoutSessionView(APIView):
    def post(self, request, *args, **kwargs):

        author=self.request.data['author_id']
        pre_author=User.objects.get(id=author)
        
        try:
            # subscription_data = {
            #     'subscriber': self.request.data['user_id'],
            #     'subscribed_to': self.request.data['author_id'],
            #     'subscription_type':self.request.data['subscription_type'],  
            #     'is_active': True,
            # }

            checkout_session=stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data':{
                        'currency':'INR',
                        'unit_amount':int(self.request.data['price'])*100,
                        'product_data':{
                            'name':pre_author.first_name+' '+pre_author.last_name,
                            'images':[
                                pre_author.profile_img.url,
                                # 'https://www.searchenginejournal.com/wp-content/uploads/2020/03/the-top-10-most-popular-online-payment-solutions-5e9978d564973.png'
                            ],
                        }
                        },
                        'quantity':1,
                        # 'payment_method_types': ['upi'],

                    },
                ],
                mode='payment',
            
                success_url = f"{self.request.data['origin_site']}?success=true&subscriber={self.request.data['user_id']}&subscribed_to={self.request.data['author_id']}&subscription_type={self.request.data['subscription_type']}&subscription_amount={self.request.data['subscription_amount']}"
,
                cancel_url=self.request.data['origin_site']+'?cancel=true'
            )

            

            # print('333333',checkout_session)
            return Response({ "message" : checkout_session },status= status.HTTP_200_OK)


        except Exception as e:
            return Response({ "message" : str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)


# @csrf_exempt
# def stripe_webhook_view(request):

#     payload=request.body

#     return HttpResponse(status=200)



     



         

   