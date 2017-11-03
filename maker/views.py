""" Create your views here. """

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .compute import compute

from .forms import ThermalInputForm, MechanicalInputForm
from .models import ThermalInput, MechanicalInput

import time
import pickle


def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, 0)


def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        pickle.load(f)


def index(request):
    if request.method == 'POST':
        t_form = ThermalInputForm(request.POST)
        m_form = MechanicalInputForm(request.POST)
        if t_form.is_valid() and m_form.is_valid():
            # View the data
            data = request.POST
            t_input = t_form.cleaned_data
            m_input = m_form.cleaned_data
            save_obj(t_input, 'misc/t_data')
            save_obj(m_input, 'misc/m_data')
            num = compute(t_input, m_input)
            context = {'data': data, 'Tdata': t_input, 'Mdata': m_input}
            return render(request, 'maker/data.html', context)
            #context = {'num': num}
            #return render(request, 'maker/test.html', context)
            # return HttpResponseRedirect(reverse('explorer:index'))
            # HttpResponseRedirect(reverse('matrices:success'))
    else:
        initial_t_input = ThermalInput.objects.get(pk=1)
        initial_m_input = MechanicalInput.objects.get(pk=1)
        t_form = ThermalInputForm(instance=initial_t_input)
        m_form = MechanicalInputForm(instance=initial_m_input)
    context = {'TForm': t_form, 'MForm': m_form}
    return render(request, 'maker/index.html', context)
