""" Create your views here. """

from django.shortcuts import render

def index(request):
    return render(request, 'explorer/index.html')

# Create your views here.
