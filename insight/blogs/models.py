from django.db import models
from accounts.models import *
from django.utils import timezone
# Create your models here.

class Topics(models.Model):
    topic=models.CharField(max_length=100)
    is_block=models.BooleanField(default=False)

    
    def __str__(self):
        return self.topic



class Blogs(models.Model):
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=200)
    banner_img=models.ImageField(upload_to='post_banner_img/',null=True,blank=True)
    content=models.TextField()
    topic=models.ForeignKey(Topics,on_delete=models.CASCADE,null=True)
    video_post=models.FileField(upload_to='blog_video/',null=True,blank=True)
    is_block=models.BooleanField(default=False)
    likes=models.IntegerField(default=0)
    is_premium_blog=models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.title
    

class Comments(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    blog=models.ForeignKey(Blogs,on_delete=models.CASCADE,related_name='comments')
    parent_comment=models.ForeignKey('self',on_delete=models.CASCADE,null=True,blank=True,related_name='replies')
    content=models.TextField()
    likes=models.IntegerField(default=0)
    created_at=models.DateTimeField(default=timezone.now,editable=False)
    updated_at=models.DateTimeField(default=timezone.now,editable=False)

    def __str__(self):
        return f"Comment by {self.user.first_name} on {self.blog.title}"
    
        