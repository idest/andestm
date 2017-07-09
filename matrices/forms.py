""" Formularios para la app matrices """
from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Field, HTML, Submit
from crispy_forms.bootstrap import AppendedText

from .models import ThermalInput, MechanicalInput

class ThermalInputForm(forms.ModelForm):
    """
    Form for the thermal input that uses crispy_forms
    """
    EF = forms.FloatField(label='E.F.',label_suffix='Ma',
                          help_text='Edad de la corteza oceánica en la fosa',
                          widget=forms.NumberInput(attrs={'step':'5'}),
                          min_value=0, max_value=100)
    K_cs = forms.FloatField(label='K (c.s.)',label_suffix='W/mK',
                          help_text='Conductividad térmica corteza superior',
                          widget=forms.NumberInput(attrs={'step':'0.1'}),
                          min_value=1, max_value=5)
    K_ci = forms.FloatField(label='K (c.i.)',label_suffix='W/mK',
                          help_text='Conductividad térmica corteza inferior',
                          widget=forms.NumberInput(attrs={'step':'0.1'}),
                          min_value=1, max_value=5)
    K_ml = forms.FloatField(label='K (m.l.)',label_suffix='W/mK',
                          help_text='Conductividad térmica manto litosférico',
                          widget=forms.NumberInput(attrs={'step':'0.1'}),
                          min_value=1, max_value=5)
    H_cs = forms.FloatField(label='H (c.s.)',label_suffix='W/m³',
                          help_text='Calor radiogénico corteza superior',
                          widget=forms.NumberInput(attrs={'step':'5e-7'}),
                          min_value=1e-6, max_value=1e-5)
    H_ci = forms.FloatField(label='H (c.i.)',label_suffix='W/m³',
                          help_text='Calor radiogénico corteza inferior',
                          widget=forms.NumberInput(attrs={'step':'5e-7'}),
                          min_value=1e-6, max_value=1e-5)
    H_ml = forms.FloatField(label='H (m.l.)',label_suffix='W/m³',
                          help_text='Calor radiogénico manto litosférico',
                          widget=forms.NumberInput(attrs={'step':'5e-7'}),
                          min_value=1e-6, max_value=1e-5)
    kpa = forms.FloatField(label='kpa',label_suffix='m²/s',
                          help_text='Difusividad térmica',
                          widget=forms.NumberInput(attrs={'step':'5e-7'}),
                          min_value=1e-6, max_value=1e-5)
    T_p = forms.FloatField(label='Tp',label_suffix='ºC',
                          help_text='Temperatura potencial del manto',
                          widget=forms.NumberInput(attrs={'step':'100'}),
                          min_value=500, max_value=1500)
    G_a = forms.FloatField(label='G.A.',label_suffix='K/m',
                          help_text='Gradiante adiabático',
                          widget=forms.NumberInput(attrs={'step':'5e-5'}),
                          min_value=1e-4, max_value=1e-3)
    V = forms.FloatField(label='V',label_suffix='m/Ma',
                          help_text='Velocidad de convergencia',
                          widget=forms.NumberInput(attrs={'step':'5e3'}),
                          min_value=1e4, max_value=1e5)
    b = forms.FloatField(label='b',label_suffix='',
                          help_text='Parametro adimensional',
                          widget=forms.NumberInput(attrs={'step':'0.1'}),
                          min_value=0.1, max_value=1)
    dip = forms.FloatField(label='dip',label_suffix='º',
                          help_text='Ángulo de subducción',
                          widget=forms.NumberInput(attrs={'step':'1'}),
                          min_value=0, max_value=90)
    D2 = forms.FloatField(label='d2',label_suffix='',
                          help_text='Const. de proporcionalidad adimensional',
                          widget=forms.NumberInput(attrs={'step':'1'}),
                          min_value=1, max_value=5)
    d_rad = forms.FloatField(label='D.rad.',label_suffix='km',
                          help_text='Decaimiento radiogénico',
                          widget=forms.NumberInput(attrs={'step':'1'}),
                          min_value=0, max_value=5)
    def __init__(self, *args, **kwargs):
        super(ThermalInputForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_tag = False #form attributes disabled
        self.helper.disable_csrf = True
        self.helper.label_class = 'col-md-4'
        self.helper.field_class = 'col-md-8'
        #Custom attributes
        self.helper.label_info = True
        self.helper.append_label_suffix = True
        self.helper.layout = Layout(
            Div(
                Div(HTML("""<h3 class="title">Variables Termales</h3>""")),
                Div('K_z', 'H_z', 'EF_lat', 'EF', 'K_cs', 'K_ci', 'K_ml',
                    'H_cs', 'H_ci', css_class='col-md-6 col-sm-12'),
                Div('H_ml', 'kpa', 'T_p', 'G_a', 'V', 'b', 'dip', 'D2',
                    'd_rad', css_class='col-md-6 col-sm-12'),
                css_class='col-md-8 col-sm-6 t-form'
                ),
            )
        self.helper.filter_by_widget(forms.NumberInput).wrap(AppendedText,
            ' this is replaced by label_suffix bc append_label_suffix=True',
            css_class="input-sm")

    class Meta:
        model = ThermalInput
        fields = ['K_z', 'H_z', 'EF_lat', 'EF', 'K_cs', 'K_ci', 'K_ml',
                  'H_cs', 'H_ci', 'H_ml', 'kpa', 'T_p', 'G_a', 'V', 'b',
                  'dip', 'D2', 'd_rad']
        """
        limits = [['5', '1', '100'], #EF
                  ['0.1', '1', '5'], #K_cs
                  ['0.1', '1', '5'], #K_ci
                  ['0.1', '1', '5'], #K_ml
                  ['5e-7', '1e-6', '1e-5'], #H_cs
                  ['5e-7', '1e-6', '1e-5'], #H_ci
                  ['5e-7', '1e-6', '1e-5'], #H_ml
                  ['5e-7', '1e-6', '1e-5'], #kpa
                  ['100', '500', '1500'], #T_p
                  ['5e-5', '1e-4', '1e-3'], #G_a
                  ['5e3', '1e4', '1e5'], #V
                  ['0.1', '0.1', '1'], #b
                  ['5', '0', '90'], #dip
                  ['1', '1', '5'], #D2
                  ['1', '0', '5'], #D_rad
                 ]
                 #⁰¹²³⁴⁵⁶⁷⁸⁹
        units = ['Ma', 'W/mK', 'W/mK', 'W/mK', 'W/m³', 'W/m³', 'W/m³',
                  'm²/s', 'ºC', 'K/m', 'm/Ma', ' ', 'º', ' ', 'km']
        widgets = {}
        label_suffix = {}
        i = 0
        for field in fields[3:]:
            widgets[field] = NumberInput(attrs={'step': limits[i][0],
                                                'min_value': limits[i][1],
                                                'max_value': limits[i][2]})
            label_suffix[field] = units[i]
            i += 1
        #widgets = {}
        #widgets.update(dict.fromkeys(['EF', 'K_cs', 'K_ci', 'K_ml', 'H_cs',
        #                              'H_ci', 'H_ml', 'kpa', 'T_p', 'G_a',
        #                              'V', 'b', 'dip', 'D2', 'd_rad'],
        #                             NumberInput))
        """

class MechanicalInputForm(forms.ModelForm):
    """
    Form for mechanical input
    """
    Bs_t = forms.FloatField(label='Bs (t)',label_suffix='MPa',
                          help_text='Constante de tensión de Byerlee',
                          widget=forms.NumberInput(attrs={'step':'5e3'}),
                          min_value=0, max_value=1e5)
    Bs_c = forms.FloatField(label='Bs (c)',label_suffix='MPa',
                          help_text='Constante de compresión de Byerlee',
                          widget=forms.NumberInput(attrs={'step':'5e3'}),
                          min_value=-1e5, max_value=-1e3)
    e = forms.FloatField(label='e',label_suffix='s⁻¹',
                          help_text='Strain Rate',
                          widget=forms.NumberInput(attrs={'step':'5e-16'}),
                          min_value=0, max_value=1e-14)
    R = forms.FloatField(label='R',label_suffix='J·mol⁻¹·K⁻¹',
                          help_text='Constante universal de gases',
                          widget=forms.NumberInput(attrs={'step':'1e-2'}),
                          min_value=1, max_value=10)
    mx_s = forms.FloatField(label='s max.',label_suffix='MPa',
                          help_text='Máximo stress disponible',
                          widget=forms.NumberInput(attrs={'step':'50'}),
                          min_value=0, max_value=500)
    def __init__(self, *args, **kwargs):
        super(MechanicalInputForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_tag = False #form attributes disabled
        self.helper.disable_csrf = True
        self.helper.label_class = 'col-md-4'
        self.helper.field_class = 'col-md-8'
        #Custom atributes
        self.helper.label_info = True
        self.helper.append_label_suffix = True
        self.helper.layout = Layout(
            Div(
                Div(HTML("""<h3 class="title">Variables Mecanicas</h3>""")),
                Div('Bs_t', 'Bs_c', 'e', 'R', 'mx_s', 'Cs', 'Ci', 'Ml',),
                css_class='col-md-4 col-sm-6 m-form'
                ),
            )
        self.helper.filter_by_widget(forms.NumberInput).wrap(AppendedText, ' ',
                                                          css_class="input-sm")
                                                                    #bfh-number
    class Meta:
        model = MechanicalInput
        fields = ['Bs_t', 'Bs_c', 'e', 'R', 'mx_s', 'Cs', 'Ci', 'Ml']
        limits = [['5e3', '1e3', '1e5'], #Bs_t
                  ['5e3', '-1e5', '-1e3'], #Bs_c
                  ['5e-16', '1e-16', '1e-14'], #e
                  ['1e-2', '1', '10'], #R
                  ['50', '10', '500'], #mx_s
                 ]
        """
        widgets = {}
        i = 0
        for field in fields[:5]:
            widgets[field] = NumberInput(attrs={'step': limits[i][0],
                                                'min_value': limits[i][1],
                                                'max_value': limits[i][2]})
            i += 1
        #widgets.update(dict.fromkeys(['Bs_t', 'Bs_c', 'e', 'R', 'mx_s'],
        #                             NumberInput))
        """
