from django.urls import path

from .consumers import *
websocket_urlpatterns=[
    path('ws/chat/<int:id>/',ChatConsumer.as_asgi()),
    path('ws/notifications/',NotificationConsumer.as_asgi())
]
