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


class IsSubscriber(APIView):

    def get(self,request,user_id,blog_author, *args, **kwargs):
        print(user_id,blog_author,'is subscriberrrrrrr')
        try:
            is_subscriber=Subscription.objects.filter(subscriber=user_id,subscribed_to=blog_author,is_active=True).exists()

            return Response({"is_subscriber":is_subscriber},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

#----------------payment STRIPE------------------------------

# @method_decorator(csrf_exempt, name='dispatch')
class CreateCheckoutSessionView(APIView):
    def post(self, request, *args, **kwargs):

        author=self.request.data['author_id']
        pre_author=User.objects.get(id=author)
        
        try:
            subscription_data = {
                'subscriber': self.request.data['user_id'],
                'subscribed_to': self.request.data['author_id'],
                'subscription_type':self.request.data['subscription_type'],  
                'is_active': True,
            }

            checkout_session=stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data':{
                        'currency':'INR',
                        'unit_amount':int(self.request.data['price'])*100,
                        'product_data':{
                            'name':pre_author.first_name+' '+pre_author.last_name,
                            # 'images':pre_author.profile_img,
                        }
                        },
                        'quantity':1

                    },
                    
                ],
                mode='payment',
            
                success_url = f"{self.request.data['origin_site']}?success=true&subscriber={self.request.data['user_id']}&subscribed_to={self.request.data['author_id']}&subscription_type={self.request.data['subscription_type']}"
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

     

# @method_decorator(csrf_exempt, name='dispatch')
# class CreatePortalSessionView(APIView):
#     def post(self, request, *args, **kwargs):
#         checkout_session_id = request.POST.get('session_id')
#         checkout_session = stripe.checkout.Session.retrieve(checkout_session_id)

#         return_url = YOUR_DOMAIN

#         portal_session = stripe.billing_portal.Session.create(
#             customer=checkout_session.customer,
#             return_url=return_url,
#         )
#         return redirect(portal_session.url, code=303)

# @method_decorator(csrf_exempt, name='dispatch')
# class WebhookView(APIView):
#     def post(self, request, *args, **kwargs):
#         payload = request.body
#         sig_header = request.headers.get('Stripe-Signature')
#         endpoint_secret = 'whsec_12345'  # Replace with your actual endpoint secret

#         try:
#             event = stripe.Webhook.construct_event(
#                 payload, sig_header, endpoint_secret
#             )
#         except ValueError as e:
#             # Invalid payload
#             return HttpResponseBadRequest("Invalid payload")
#         except stripe.error.SignatureVerificationError as e:
#             # Invalid signature
#             return HttpResponseBadRequest("Invalid signature")

#         # Handle the event
#         self.handle_event(event)

#         return JsonResponse({'status': 'success'})
    
    # def handle_event(self, event):


         

   