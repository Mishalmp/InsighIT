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



class CommentSerializer(serializers.ModelSerializer):
    user=UserSerializer(required=False)
    class Meta:
        model=Comments
        fields='__all__'


class CommentCreateSerializer(serializers.ModelSerializer):
   
    class Meta:
        model=Comments
        fields='__all__'


class LikeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Like
        fields='__all__'


class ReportBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model=Report_blog
        fields='__all__'

class ReportListSerializer(serializers.ModelSerializer):
    user=UserSerializer(required=False)
    blog=Blogserializer(required=False)
    class Meta:
        model=Report_blog
        fields='__all__'
        


