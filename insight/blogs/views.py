from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView

from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
import traceback
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class TopicsListCreateView(ListCreateAPIView):
    queryset=Topics.objects.all()
    serializer_class=TopicsSerializer

    # permission_classes=[IsAuthenticated]


    # def get(self, request, *args, **kwargs):
    #     topics = self.get_queryset()
    #     serializer = self.get_serializer(topics, many=True)
    #     return Response(serializer.data)

class TopicsView(RetrieveUpdateDestroyAPIView):
    queryset=Topics.objects.all()
    serializer_class=TopicsSerializer
    # permission_classes=[IsAuthenticated]



class BlogsListCreateView(ListCreateAPIView):
    queryset = Blogs.objects.all()
    serializer_class = CreateSerializer
    # permission_classes = [IsAuthenticated]


    # def post(self, request, *args, **kwargs):
    #     try:
    #         # Assign the current user to the user_id field when creating a new blog
    #         serializer = self.get_serializer(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save(user_id=request.user.id)

    #         return Response({'success': 'Blog created successfully'}, status=status.HTTP_201_CREATED)
    #     except Exception as e:

    #         print(traceback.format_exc())
    #         # Handle the exception and return an error response
    #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.db.models import Q
class ListBlogsView(ListAPIView):
    
    queryset=Blogs.objects.all().order_by('-created_at')
    serializer_class=Blogserializer
    filter_backends = [SearchFilter]
    search_fields=['title']

    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #     search_query = self.request.query_params.get('search[search]', None)
        
    #     if search_query:
    #         queryset = queryset.filter(Q(title__icontains=search_query)  | Q(topic__topic__icontains=search_query))
        
    #     return queryset

class TrendingBlogsListView(ListAPIView):
    serializer_class = Blogserializer

    def get_queryset(self):
        
        trending_blogs = Blogs.objects.filter(is_block=False).order_by('-likes')[:5]
        return trending_blogs

class BlogDetailView(RetrieveUpdateDestroyAPIView):
    queryset=Blogs.objects.all()
    serializer_class=Blogserializer
    # permission_classes=[IsAuthenticated]


class BlogsByTopicListView(ListAPIView):
    serializer_class = Blogserializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        topic = self.kwargs['topic']
        return Blogs.objects.filter(topic=topic).order_by('-created_at')

class BlogsByUserListView(ListAPIView):
    serializer_class = Blogserializer
    # permission_classes = [IsAuthenticated]
    filter_backends=[SearchFilter]
    search_fields = ['title', 'topic__topic']
    filterset_fields = ['user_id'] 
    
    
    def get_queryset(self):
        queryset = Blogs.objects.all().order_by('-created_at')
        user_id = self.kwargs.get('user_id')

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset