from django.db import models

from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.

from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", 'admin')

        if extra_fields.get("is_active") is not True:
            raise ValueError("Superuser must have is_active=True.")
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        return self.create_user(email, password, **extra_fields)






class User(AbstractUser):
    USER_TYPE=(
        ('user','user'),
        ('admin','Admin'),
    )
    

    first_name=models.CharField(max_length=200,null=True)
    last_name=models.CharField(max_length=200,null=True)
    username = models.CharField(max_length=150, unique=False)
    email=models.EmailField(max_length=250,unique=True)
    
    profile_img=models.ImageField(upload_to='user_profile_img/',blank=True,null=True)
    cover_img=models.ImageField(upload_to='user_cover_img/',blank=True,null=True)
    is_active=models.BooleanField(default=False)
    role=models.CharField(max_length=50,choices=USER_TYPE,default='user')
    is_google=models.BooleanField(default=False)
    is_completed=models.BooleanField(default=False)
    bio=models.TextField(max_length=500,null=True)
    tag_name=models.CharField(max_length=50,default='He/She')
    is_premium=models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    objects=CustomUserManager()



class Skills(models.Model):
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    skill=models.CharField(max_length=100)
    rateofskills=models.IntegerField(default=0)


class PremiumUserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='premiumuserinfo')
    
    subscription_price = models.DecimalField(max_digits=10, decimal_places=2, default=50)
    pan_number = models.CharField(max_length=10)
    bank_name=models.CharField(max_length=100,default='sbi')
    linkedin_url=models.CharField(max_length=100,default='skdcbkasbckaskcxbk')
    account_number = models.CharField(max_length=20)
    ifsc_code = models.CharField(max_length=20)
    is_approved=models.BooleanField(default=False)

    def __str__(self):
        return self.user.email

class Qualifications(models.Model):
    premium_user = models.ForeignKey(PremiumUserInfo, on_delete=models.CASCADE)
    qualifications = models.CharField(max_length=100,null=True)

class Experiences(models.Model):
    premium_user = models.ForeignKey(PremiumUserInfo, on_delete=models.CASCADE)
    experience = models.CharField(max_length=200,null=True)


class Subscription(models.Model):
    SUBSCRIPTION_CHOICES=[
        ('monthly','Monthly'),
        ('yearly','Yearly'),
    ]

    SUBSCRIPTION_TYPE=[
        ('basic','Basic'),
        ('premium','Premium'),
    ]

    subscriber=models.ForeignKey(User,related_name='subscriptions',on_delete=models.CASCADE)
    subscribed_to=models.ForeignKey(User,related_name='subscribers',on_delete=models.CASCADE)
    subscription_time=models.CharField(max_length=10,choices=SUBSCRIPTION_CHOICES)
    subscription_type=models.CharField(max_length=10,choices=SUBSCRIPTION_TYPE)
    is_active=models.BooleanField(default=False)
    created_at=models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.subscriber.first_name} subscribes to {self.subscribed_to.first_name} ({self.subscription_type} - {self.subscription_time})"


class Notifications(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    text=models.CharField(max_length=200)
    created_at=models.DateTimeField(auto_now_add=True)
    is_read=models.BooleanField(default=False)

    def __str__(self):

        return self.text
        