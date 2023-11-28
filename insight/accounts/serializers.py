from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *

from rest_framework.validators import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'email', 'first_name','last_name', 'password', 'profile_img','cover_img','role','is_completed','bio','tag_name']
        extra_kwargs={
            'password':{'write_only':True},
        }


    # def create(self,validated_data):

    #     password=validated_data['password']
    #     user=super().create(validated_data)
    #     user.set_password(password)
    #     user.save()
    #     return user


class UserGoogleSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email', 'first_name','last_name','role','is_active','is_google']
        extra_kwargs={
            'password':{'write_only':True}
        }

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod

    def get_token(cls,user):
        token=super().get_token(user)

        if not user.is_active:
            raise ValidationError('User is not active', code='inactive_user')

        token['id']=user.id
        token['email']=user.email
        token['role']=user.role
        token['is_active']=user.is_active
        token['is_completed']=user.is_completed

        return token
    
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        


        

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skills
        fields='__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notifications
        fields='__all__'



class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class SubscriptionlistSerializer(serializers.ModelSerializer):
    subscriber=UserSerializer(read_only=True)
    subscribed_to=UserSerializer(read_only=True)
    class Meta:
        model=Subscription
        fields='__all__'


class FollowingsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Followings
        fields='__all__'


class FollowinglistSerializer(serializers.ModelSerializer):
    follower=UserSerializer(read_only=True)
    following=UserSerializer(read_only=True)
    class Meta:
        model=Followings
        fields='__all__'

class Walletserializer(serializers.ModelSerializer):
    recieved_from=UserSerializer(read_only=True)

    class Meta:
        model=Wallet
        fields='__all__'

        