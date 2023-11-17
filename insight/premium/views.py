from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView
from accounts.models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
# Create your views here.



class PremiumUserInfoListCreateView(ListCreateAPIView):
    queryset=PremiumUserInfo.objects.all()
    serializer_class=PremiuminfoSerializer


class PremiumUserInfoDetailView(RetrieveUpdateDestroyAPIView):
    # queryset=PremiumUserInfo.objects.all()
    serializer_class=PremiuminfoSerializer
    lookup_field='user'

    def get_queryset(self):
        user_id=self.kwargs.get('user')
        premiumview=PremiumUserInfo.objects.filter(user=user_id)
        return premiumview


class ExperienceListCreateView(ListCreateAPIView):
    queryset=Experiences.objects.all()
    serializer_class=ExperiencesSerializers


class QualificationsListCreateView(ListCreateAPIView):
    queryset=Qualifications.objects.all()
    serializer_class=QualificationSerializers
