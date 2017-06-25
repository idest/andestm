""" Create your views here. """

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .forms import ThermalInputForm, MechanicalInputForm

def index(request):
    if request.method == 'POST':
        TForm = ThermalInputForm(request.POST)
        MForm = MechanicalInputForm(request.POST)
        if TForm.is_valid() and MForm.is_valid():
            HttpResponseRedirect(reverse('matrices:success'))
    else:
        TForm = ThermalInputForm()
        MForm = MechanicalInputForm()
    context = {'TForm': TForm, 'MForm': MForm}
    return render(request, 'matrices/index.html', context)
