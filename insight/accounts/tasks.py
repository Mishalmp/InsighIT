from celery import shared_task
from django.core.mail import send_mail
from insight.settings import EMAIL_HOST_USER
from django.contrib.auth import get_user_model
from .models import * 
from django.utils import timezone


@shared_task(bind = True)
def send_mail_func(self):
    users = get_user_model().objects.all()

    for user in users:
        mail_subject = 'Hi! Good morning'
        message = 'Open InsighIt and start reading ,New interesting contents have uploaded!!!'
        to_mail=user.email
        send_mail(
            subject=mail_subject,
            message=message,
            from_email=EMAIL_HOST_USER,
            recipient_list=[to_mail],
            fail_silently=True,
        )
    return "doneee"
    

@shared_task()
def check_expiring_subscription():
    expiring_subscriptions = Subscription.objects.filter(
        end_time__lte=timezone.now(),
        is_active=True
    )

    for subscription in expiring_subscriptions:
        if subscription.end_time < timezone.now():
            subscription.delete()
            notification_text = f"Your subscription to {subscription.subscribed_to.first_name} has expired"
            Notifications.objects.create(user=subscription.subscriber, text=notification_text)