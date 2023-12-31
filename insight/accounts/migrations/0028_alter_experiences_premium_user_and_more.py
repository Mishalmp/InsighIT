# Generated by Django 4.2.6 on 2023-12-06 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0027_rename_pre_id_premiumrequests_premium'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experiences',
            name='premium_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experiences', to='accounts.premiumuserinfo'),
        ),
        migrations.AlterField(
            model_name='qualifications',
            name='premium_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='qualifications', to='accounts.premiumuserinfo'),
        ),
    ]
