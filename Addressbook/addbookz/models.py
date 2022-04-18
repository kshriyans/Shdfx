from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf.urls import include
# Create your models here.
class Contactlist(models.Model):
	contact_name = models.CharField(max_length=200)
	contact_number = models.PositiveIntegerField()
	contact_address = models.CharField(max_length = 1000)
