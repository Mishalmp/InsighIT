from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db import models
from django.utils import timezone
from .models import *


@receiver(post_save,sender=User)
def send_user_created_notification(sender,instance,created,*args,**kwargs):

    if created:
        notification_text = f'New user is created {instance.first_name} {instance.last_name}'
        
        admin_user = User.objects.filter(is_superuser = True).first()
        Notifications.objects.create(user=admin_user,text=notification_text )



@receiver(post_save,sender=PremiumUserInfo)
def send_user_created_notification(sender,instance,created,*args,**kwargs):

    if created:
        notification_text = f'New premium user request has been recieved {instance.user.first_name} {instance.user.last_name}'
        
        admin_user = User.objects.filter(is_superuser = True).first()
        Notifications.objects.create(user=admin_user,text=notification_text )


@receiver(post_save, sender=Subscription)
def send_notification_subs(sender, instance, created, **kwargs):

    if created:
        notification_text = f'{instance.subscriber.first_name} {instance.subscriber.last_name} subscribed to {instance.subscribed_to.first_name} ({instance.subscription_type})'
        
        admin_user = User.objects.filter(is_superuser = True).first()
        Notifications.objects.create(user=admin_user,text=notification_text )

@receiver(post_save,sender=Subscription)
def update_is_active(sender,instance,*args,**kwargs):
    if instance.end_time < timezone.now():
        instance.delete()
        # instance.is_active=False

        notification_text=f"Your subscription to {instance.subscribed_to.first_name} has expired"
        Notifications.objects.create(user=instance.subscriber,text=notification_text)
   


@receiver(post_save, sender=Subscription)
def update_subscription_price(sender, instance, created, **kwargs):
    subscribed_to = instance.subscribed_to
    subscribers_count = Subscription.objects.filter(subscribed_to=subscribed_to).count()

    if subscribers_count % 5 == 0 and subscribed_to.is_premium:
        premium_info = subscribed_to.premiumuserinfo
        premium_info.subscription_price_basic += 10
        premium_info.subscription_price_std += 10
        premium_info.sub_price_basic_yr += 50
        premium_info.sub_price_std_yr += 50

        premium_info.save()

        notification_text = "Your subscription price has been increased by 10"
        Notifications.objects.create(user=subscribed_to, text=notification_text)


@receiver(post_save, sender=Wallet)
def send_notification_wallet(sender, instance, created, **kwargs):

    if created:
        notification_text = f'Amount has been recieved from {instance.recieved_from.first_name} {instance.recieved_from.last_name}'
        
        admin_user = User.objects.filter(is_superuser = True).first()
        Notifications.objects.create(user=admin_user,text=notification_text )


@receiver(post_save, sender=Report_Issue)
def send_notification_report(sender, instance, created, **kwargs):

    if created:
        notification_text = f'A new report has been recieved from {instance.user.first_name} {instance.user.last_name}'
        
        admin_user = User.objects.filter(is_superuser = True).first()
        Notifications.objects.create(user=admin_user,text=notification_text )
