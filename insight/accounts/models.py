from django.db import models

from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.



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
        ('author','Author'),
        ('admin','Admin'),
    )
    

    first_name=models.CharField(max_length=200,null=True)
    last_name=models.CharField(max_length=200,null=True)
    # username = models.CharField(max_length=150, unique=True)
    email=models.EmailField(max_length=250,unique=True)
    
    profile_img=models.ImageField(upload_to='user_profile_img/',blank=True,null=True)
    cover_img=models.ImageField(upload_to='user_cover_img/',blank=True,null=True)
    is_active=models.BooleanField(default=False)
    role=models.CharField(max_length=50,choices=USER_TYPE,default='user')
    is_google=models.BooleanField(default=False)
    is_completed=models.BooleanField(default=False)
    bio=models.TextField(max_length=500,null=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    objects=CustomUserManager()