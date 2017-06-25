""" Formularios para la app matrices """

from django.forms import ModelForm, NumberInput, TextInput, CheckboxInput

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Field, HTML, Submit

from .models import ThermalInput, MechanicalInput

class ThermalInputForm(ModelForm):
    """
    Form for the thermal input that uses crispy_forms
    """
    def __init__(self, *args, **kwargs):
        super(ThermalInputForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_tag = False #form attributes disabled
        #self.helper.form_id = 'id-ThermalInputForm'
        #self.helper.form_class = 'form-horizontal'
        #self.helper.form_method = 'post'
        #self.helper.form_action = ''
        self.helper.disable_csrf = True
        self.helper.label_class = 'col-md-4'
        self.helper.field_class = 'col-md-8'
        self.helper.label_info = True
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
        self.helper.filter_by_widget(NumberInput).wrap(Field,
                                               css_class="input-sm bfh-number")
    class Meta:
        model = ThermalInput
        fields = ['K_z', 'H_z', 'EF_lat', 'EF', 'K_cs', 'K_ci', 'K_ml',
                  'H_cs', 'H_ci', 'H_ml', 'kpa', 'T_p', 'G_a', 'V', 'b', 'dip',
                  'D2', 'd_rad']
        widgets = {}
        widgets.update(dict.fromkeys(['EF', 'K_cs', 'K_ci', 'K_ml', 'H_cs',
                                      'H_ci', 'H_ml', 'kpa', 'T_p', 'G_a',
                                      'V', 'b', 'dip', 'D2', 'd_rad'],
                                     NumberInput))

class MechanicalInputForm(ModelForm):
    """
    Form for mechanical input
    """
    def __init__(self, *args, **kwargs):
        super(MechanicalInputForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_tag = False #form attributes disabled
        #self.helper.form_id = 'id-ThermalInputForm'
        #self.helper.form_class = 'form-horizontal'
        #self.helper.form_method = 'post'
        #self.helper.form_action = ''
        self.helper.disable_csrf = True
        self.helper.label_class = 'col-md-4'
        self.helper.field_class = 'col-md-8'
        self.helper.label_info = True
        #self.helper.add_input(Submit('submit', 'Submit'))
        self.helper.layout = Layout(
            Div(
                Div(HTML("""<h3 class="title">Variables Mecanicas</h3>""")),
                Div('Bs_t', 'Bs_c', 'e', 'R', 'Cs', 'Ci', 'Ml', 'mx_s'),
                css_class='col-md-4 col-sm-6 m-form'
                ),
            )
        self.helper.filter_by_widget(NumberInput).wrap(Field,
                                               css_class="input-sm bfh-number")
    class Meta:
        model = MechanicalInput
        fields = ['Bs_t', 'Bs_c', 'e', 'R', 'Cs', 'Ci', 'Ml', 'mx_s']
        widgets = {}
        widgets.update(dict.fromkeys(['Bs_t', 'Bs_c', 'e', 'R', 'mx_s'],
                                     NumberInput))
