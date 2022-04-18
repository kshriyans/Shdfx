from django.urls import path
from .views import addbook,addbookupdate
from django.conf.urls import include
urlpatterns = [
	path('api-auth/',include('rest_framework.urls')),
	path('contact-items/',addbook.as_view()),
	path('update-items/<int:item_id>', addbookupdate.as_view()),
]