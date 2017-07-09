from django.contrib import admin

from .models import GeometricModel, RheologicModel, ThermalInput, MechanicalInput

# Register your models here.

admin.site.register(GeometricModel)
admin.site.register(RheologicModel)
admin.site.register(ThermalInput)
admin.site.register(MechanicalInput)
