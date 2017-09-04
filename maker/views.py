""" Create your views here. """

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

#from .compute import compute

from .forms import ThermalInputForm, MechanicalInputForm
from .models import ThermalInput, MechanicalInput

import time

def index(request):
    if request.method == 'POST':
        TForm = ThermalInputForm(request.POST)
        MForm = MechanicalInputForm(request.POST)
        if TForm.is_valid() and MForm.is_valid():
            #View the data
            data = request.POST
            Tdata = TForm.cleaned_data
            Mdata = MForm.cleaned_data
            context = {'data': data, 'Tdata': Tdata, 'Mdata': Mdata}
            #time.sleep(10)
            return render(request, 'maker/data.html', context)
            #Tdata = TForm.cleaned_data
            #Mdata = MForm.cleaned_data
            #num = compute(Tdata, Mdata)
            #context = {'num': num}
            #return render(request, 'matrices/test.html', context)
            #return HttpResponseRedirect(reverse('explorer:index'))
            #HttpResponseRedirect(reverse('matrices:success'))
    else:
        Initial_TI = ThermalInput.objects.get(pk=1)
        Initial_MI = MechanicalInput.objects.get(pk=1)
        TForm = ThermalInputForm(instance=Initial_TI)
        MForm = MechanicalInputForm(instance=Initial_MI)
    context = {'TForm': TForm, 'MForm': MForm}
    return render(request, 'maker/index.html', context)
