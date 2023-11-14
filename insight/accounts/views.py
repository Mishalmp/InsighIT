from django.shortcuts import render
from .models import User
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate



class SingleUserInfo(RetrieveUpdateDestroyAPIView):
    queryset=User.objects.all()
    serializer_class=UserInfoSerializer
    