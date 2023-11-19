from django.shortcuts import render
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