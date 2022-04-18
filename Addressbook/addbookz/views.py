from django.shortcuts import render
from django.views import View
from django.views.generic.edit  import CreateView
from django.http import JsonResponse
import json
import numpy as np
from .models import Contactlist
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class addbook(View):
	def post(self,request):
		data = json.loads(request.body.decode("utf-8"))
		c_name = data.get('contact_name')
		c_number = data.get('contact_number')
		c_address = data.get('contact_address')
		cd=[]
		cd.append(c_address)
		contact_data = {
			'contact_name': c_name,
			'contact_number': c_number,
			'contact_address': cd,
		}
		contact_item = Contactlist.objects.create(**contact_data)
		data = {
			"message": f"New contact added to the list with id: {contact_item.id}"
		}
		return JsonResponse(data,status=201)
	def get(self,request):
		items_count = Contactlist.objects.count()
		items = Contactlist.objects.all()
		items_data = []
		for item in items:
			items_data.append({
				'contact_name': item.contact_name,
				'contact_number': item.contact_number,
				'contact_address': item.contact_address, 
			})
		data = {
			'items':items_data,
			'count':items_count,
		}
		return JsonResponse(data)
@method_decorator(csrf_exempt, name='dispatch')
class addbookupdate(View):
	def put(self,request,item_id):
		data = json.loads(request.body.decode("utf-8"))
		item = Contactlist.objects.get(id=item_id)
		item.contact_name = data['contact_name']
		item.contact_number = data['contact_number']
		lm = data['contact_address']
		d = lm.split()
		if len(d)==2:
			cd =[]
			if d[1] =='Delete':
				cd = item.contact_address.split(',')
				stat = False
				for word in cd:
					if word == d[0]:
						cd.remove(word)
						stat =True
				if stat:
					item.contact_address = ','.join(cd)
		else:
			item.contact_address += ','+data['contact_address']
		item.save();

		data = {
			'message':f'Item {item_id} has been updates'
		}
		return JsonResponse(data)

	def delete(self,request,item_id):
		item = Contactlist.objects.get(id=item_id)
		item.delete()
		data = {
			'message':f'Item {item_id} has been deleted'
		}
		return JsonResponse(data)