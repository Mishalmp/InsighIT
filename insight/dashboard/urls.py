from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns=[
    path('token/',AdminTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),

    path('userlist/',ListUser.as_view(),name='ListUser'),
    path('userblockunblock/<int:id>/',UserBlockUnblock.as_view(),name='UserBlockUnblock'),
]