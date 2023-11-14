from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer 

class TopicsSerializer(serializers.ModelSerializer):

    class Meta:
        model=Topics
        fields=['id','topic','is_block']
    


class Blogserializer(serializers.ModelSerializer):
    user_id = UserSerializer(required = False)
    topic = TopicsSerializer(required = False, read_only=True)
    class Meta:
        model=Blogs
        fields = '__all__'


class CreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = '__all__'



    # user_id = serializers.ReadOnlyField(source='user_id.username')

   
    # topic = serializers.ReadOnlyField(source='topic.topic')