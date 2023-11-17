from rest_framework import serializers
from accounts.models import *
from blogs.models import *



class QualificationSerializers(serializers.ModelSerializer):
    
    class Meta:
        model=Qualifications
        fields='__all__'


class ExperiencesSerializers(serializers.ModelSerializer):
    class Meta:
        model=Experiences
        fields='__all__'





class PremiuminfoSerializer(serializers.ModelSerializer):
    qualifications = QualificationSerializers(many=True,required = False)
    experiences = ExperiencesSerializers(many=True,required = False)

    class Meta:
        model = PremiumUserInfo
        fields = [
            'id', 'user', 'subscription_price', 'pan_number', 'account_number','bank_name','linkedin_url',
            'ifsc_code', 'is_approved', 'experiences','qualifications'
        ]

    
    def create(self,validated_data):
        qualifications_data=validated_data.pop('qualifications',[])
        experiences_data=validated_data.pop('experiences',[])

        premium_user=PremiumUserInfo.objects.create(**validated_data)


        for qualification_data in qualifications_data:
            Qualifications.objects.create(premium_user,premium_user,**qualification_data)
        
        for experience_data in experiences_data:
            Experiences.objects.create(premium_user=premium_user,**experience_data)
        
        return premium_user
    
    # def update(self, instance, validated_data):
    #     instance.subscription_price = validated_data.get('subscription_price', instance.subscription_price)
    #     instance.pan_number = validated_data.get('pan_number', instance.pan_number)
    #     instance.account_number = validated_data.get('account_number', instance.account_number)
    #     instance.ifsc_code = validated_data.get('ifsc_code', instance.ifsc_code)
    #     instance.is_approved = validated_data.get('is_approved', instance.is_approved)

    #     # Update nested qualifications
    #     qualifications_data = validated_data.get('qualifications', [])
    #     for qualification_data in qualifications_data:
    #         # Assuming qualifications have unique IDs
    #         qualification_id = qualification_data.get('id')
    #         if qualification_id:
    #             qualification = Qualifications.objects.get(pk=qualification_id)
    #             Qualifications.objects.update_or_create(premium_user=instance, id=qualification_id, defaults=qualification_data)
    #         else:
    #             Qualifications.objects.create(premium_user=instance, **qualification_data)

    #     # Update nested experiences
    #     experiences_data = validated_data.get('experiences', [])
    #     for experience_data in experiences_data:
    #         # Assuming experiences have unique IDs
    #         experience_id = experience_data.get('id')
    #         if experience_id:
    #             experience = Experiences.objects.get(pk=experience_id)
    #             Experiences.objects.update_or_create(premium_user=instance, id=experience_id, defaults=experience_data)
    #         else:
    #             Experiences.objects.create(premium_user=instance, **experience_data)

    #     instance.save()
    #     return instance