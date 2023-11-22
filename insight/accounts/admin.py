from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Skills)
admin.site.register(PremiumUserInfo)
admin.site.register(Qualifications)
admin.site.register(Experiences)
admin.site.register(Notifications)
admin.site.register(Subscription)