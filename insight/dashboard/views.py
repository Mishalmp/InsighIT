from django.shortcuts import render

from blogs.serializers import TopicsSerializer

# Create your views here.
from .serializers import *
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from accounts.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView,UpdateAPIView
from rest_framework.pagination import PageNumberPagination
from accounts.models import *
from blogs.models import *
from django.db.models import Count, Sum
from rest_framework.views import APIView
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class=AdminTokenObtainPairSerializers


class ListUser(ListAPIView):

    serializer_class=UserListSerializer
    filter_backends=[SearchFilter]
    search_fields=['email','first_name','last_name','role']
    pagination_class=PageNumberPagination
    # queryset=User.objects.filter(role='user').exclude(is_superuser=True).order_by('-id')


    def get_queryset(self):
        
        filter_value = self.request.query_params.get('filter')

        if filter_value == 'active':
            return User.objects.filter(role='user',is_active = True).exclude(is_superuser=True).order_by('-id')
        elif filter_value == 'blocked':
            return User.objects.filter(role='user',is_active = False).exclude(is_superuser=True).order_by('-id')
        else:
            return User.objects.filter(role='user').exclude(is_superuser=True).order_by('-id')


class TopicsList(ListAPIView):
    serializer_class = TopicsSerializer
    filter_backends = [SearchFilter]
    search_fields=['topic']

    def get_queryset(self):
        
        filter_value = self.request.query_params.get('filter')

        if filter_value == 'active':
            return Topics.objects.filter(is_block = False).order_by('-id')
        elif filter_value == 'inactive':
            return Topics.objects.filter(is_block = True).order_by('-id')
        else:
            return Topics.objects.all().order_by('-id')


class UserBlockUnblock(UpdateAPIView):
    queryset=User.objects.all().exclude(is_superuser=True)
    serializer_class=BlockUnblockSerializer
    lookup_field='id'


class DashboardStats(APIView):
    def get(self, request, format=None):
        users_count = User.objects.count()
        premium_users_count = User.objects.filter(is_premium=True).count()
        # total_sales = Subscription.objects.aggregate(Sum('subscription_amount'))['subscription_amount__sum']
        total_sales = User.objects.get(is_superuser=True).wallet_balance
        total_blogs_count = Blogs.objects.count()
        # Admin_wallet_balance = User.objects.filter(is_superuser=True).aggregate(Sum('wallet_balance'))['wallet_balance__sum']
        Admin_wallet_balance = User.objects.get(is_superuser=True).wallet_balance

        total_topics_count = Topics.objects.count()

        data = {
            'users_count': users_count,
            'premium_users_count': premium_users_count,
            'total_sales': total_sales,
            'total_blogs_count': total_blogs_count,
            'Admin_wallet_balance': Admin_wallet_balance,
            'total_topics_count': total_topics_count,
        }

        return Response(data)

