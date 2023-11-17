from django.urls import path
from .views import *

urlpatterns = [
    path('topics/', TopicsListCreateView.as_view(), name='topics-list-create'),
    path('topicsview/<int:pk>/',TopicsView.as_view(),name='topic-view'),
    path('blogs/', BlogsListCreateView.as_view(), name='blogs-list-create'),
    path('blogdetail/<int:pk>/', BlogDetailView.as_view(), name='blogs-detail'),
    path('blogslist/',ListBlogsView.as_view(),name='blogs-list'),
    path('trendingblogs/',TrendingBlogsListView.as_view(),name='trendingblogs'),

    path('blogs/by-topic/<int:topic>/', BlogsByTopicListView.as_view(), name='blogs-by-topic'),

    path('blogs/by-user/<int:user_id>/', BlogsByUserListView.as_view(), name='blogs-by-user'),
]