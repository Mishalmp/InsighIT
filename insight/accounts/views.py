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



#----------------payment STRIPE------------------------------

#! /usr/bin/env python3.6



# import stripe

# # This is your test secret API key.
# stripe.api_key = settings.STRIPE_SECRET_KEY



# class StripeCheckoutView(APIView):
#     def post(self,request):
#         try:
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
                         
#                         'price': '{{PRICE_ID}}',
#                         'quantity': 1,
#                     },
#                 ],
#                 mode='payment',
#                 success_url=YOUR_DOMAIN + '?success=true',
#                 cancel_url=YOUR_DOMAIN + '?canceled=true',
#             )
#         except Exception as e:
#             return str(e)

#         return redirect(checkout_session.url, code=303)

# if __name__ == '__main__':
#     app.run(port=4242)




# @method_decorator(csrf_exempt, name='dispatch')
class CreateCheckoutSessionView(APIView):
    def post(self, request, *args, **kwargs):
        pre_id=self.kwargs['pk']
        print('1111111111',pre_id)
        try:
            pre_user=User.objects.get(id=pre_id)
            print('222222222',pre_user.premiumuserinfo.subscription_price)
            checkout_session=stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data':{
                        'currency':'INR',
                        'unit_amount':int(pre_user.premiumuserinfo.subscription_price)*100,
                        'product_data':{
                            'name':pre_user.first_name,
                            # 'images':pre_user.profile_img.url,
                        }
                        },
                        'quantity':1

                    },
                    
                ],
                mode='payment',
                # metadata={
                #     'pre_id':pre_user.id
                # },
                success_url=SITE_URL+'?success=true',
                cancel_url=SITE_URL+'?cancel=true'
            )
            print('333333',checkout_session)
            return redirect(checkout_session.url)


        except Exception as e:
            return Response({'msg': 'Something went wrong while creating a Stripe session', 'error': str(e)}, status=500)


@csrf_exempt
def stripe_webhook_view(request):

    payload=request.body

    return HttpResponse(status=200)

     

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


         

   