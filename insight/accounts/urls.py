from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views_accounts import *
from .views import *

urlpatterns=[
    path('token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',UserRegister.as_view(),name='register'),
   
    path('activate/<uidb64>/<token>',activate, name='activate'),
    path('GoogleUser/',GoogleUser.as_view(), name='GoogleUser'),
    path('userinfo/<int:pk>/',SingleUserInfo.as_view(),name='userinfo'),
    path('forgotpassword/',ForgotPassword.as_view(),name='forgotpassword'),
    path('reset-validate/<uidb64>/<token>',reset_validate,name='reset_validate'),
    path('reset-passsword/',ResetPassword.as_view(),name='reset-password'),
    path('updateuser/<int:pk>/',UpdateUser.as_view(),name='updateuser'),

    path('skills/',CreateSkills.as_view(),name='skill-create'),
    path('skillview/<int:pk>/',SkillView.as_view(),name='skill-view'),
    path('listskills/<int:user_id>',ListSkills.as_view(),name='list-skills'),



    path('create-checkout-session/<int:pk>/',CreateCheckoutSessionView.as_view(),name='checkout-session'),
    path('webhook/',stripe_webhook_view,name='web_hook'),





]