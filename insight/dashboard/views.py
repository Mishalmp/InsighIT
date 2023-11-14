from django.shortcuts import render

# Create your views here.
from .serializers import *
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from accounts.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView,UpdateAPIView
from rest_framework.pagination import PageNumberPagination


class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class=AdminTokenObtainPairSerializers


class ListUser(ListAPIView):

    serializer_class=UserListSerializer
    filter_backends=[SearchFilter]
    search_fields=['email','first_name','last_name','role']
    pagination_class=PageNumberPagination
    queryset=User.objects.filter(role='user').exclude(is_superuser=True).order_by('-id')


class UserBlockUnblock(UpdateAPIView):
    queryset=User.objects.all().exclude(is_superuser=True)
    serializer_class=BlockUnblockSerializer
    lookup_field='id'




