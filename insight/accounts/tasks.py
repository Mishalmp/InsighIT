from celery import shared_task
from django.core.mail import send_mail
from insight.settings import EMAIL_HOST_USER
from django.contrib.auth import get_user_model

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
    

