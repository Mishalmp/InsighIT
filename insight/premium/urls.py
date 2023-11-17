from django.urls import path
from .views import *

urlpatterns=[
    path('premiumuserinfo/',PremiumUserInfoListCreateView.as_view(),name='premium-user-create'),
    path('premiumuserinfoview/<int:user>/',PremiumUserInfoDetailView.as_view(),name='premiuminfo-view'),
    path('experiences/',ExperienceListCreateView.as_view(),name='experience-view'),
    path('qualifications/',QualificationsListCreateView.as_view(),name='qualifications-view'),

]