""" Modelos de Django para la app Matrices """

from django.db import models

class GeometricModel(models.Model):
    """
    Modelo inicial que caracteriza la estructura geometrica de la litosfera
    por medio de la determinacion de la profundidad de cuatro fronteras
    (boundaries) distintas para cada par ordenado (lon, lat).

    La estructura de las filas es la siguiente:
    LON LAT SLAB-LAB MOHO ICD TOPO
    """
    file = models.FileField(upload_to='data')

    def ___str__(self):
        return self.file.name

"""

    def shrink(self, i_lon, f_lon, i_lat, f_lat):

    def get_shape(self):

    def get_matrix(self):

"""

class RheologicModel(models.Model):
    """
    Modelo que contiene datos reologicos para cada tipo determinado de roca
    """
    num = models.IntegerField()
    name = models.CharField(max_length=20)
    H = models.FloatField()
    n = models.FloatField()
    A = models.FloatField()
    ref = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class TrenchAge(models.Model):
    """
    Modelo que caracteriza la edad de la fosa en funcion de su latitud
    """
    file = models.FileField(upload_to='data')

    def __str__(self):
        return self.file.name

class Limits(models.Model):
    """
    Modelo que contiene los limites de las matrices resultantes, en coordenadas
    geograficas.
    """
    minlon = models.FloatField()
    minlat = models.FloatField()
    maxlon = models.FloatField()
    maxlat = models.FloatField()
    #Validator

    def __str__(self):
        return '({}, {}) ({}, {})'.format(self.minlon, self.minlat,
                                          self.maxlon, self.maxlat)

class Resolution(models.Model):
    """
    Modelo que contiene la resolucion de las matrices resultantes, en
    coordenadas geograficas.
    """
    geo_delta = models.FloatField()
    z_delta = models.FloatField()
    #Validator

class ThermalInput(models.Model):
    """
    Thermal parameters defined by the user
    """
    k_z = models.BooleanField("k = f(z)",
        help_text="¿Usar k en función de la profundidad?")
    H_z = models.BooleanField("H = f(z)",
        help_text="¿Usar H en función de la profundidad?")
    delta_icd = models.BooleanField("δ = ICD",
        help_text="¿Usar δ igual a profundidad de la ICD?")
    t_lat = models.BooleanField("t = f(lat)",
        help_text="¿Usar t en función de la latitud?")
    k_cs = models.FloatField("k (c.s.)",
        help_text="Conductividad térmica de la corteza superior (W/mK)")
    k_ci = models.FloatField("k (c.i.)",
        help_text="Conductividad térmica de la corteza inferior (W/mK)")
    k_ml = models.FloatField("k (m.l.)",
        help_text="Conductividad térmica del manto litosférico (W/mK)")
    H_cs = models.FloatField("H (c.s.)",
        help_text="Producción de calor radiogénico en la corteza superior \
        (W/m³)")
    H_ci = models.FloatField("H (c.i.)",
        help_text="Producción de calor radiogénico en la corteza inferior \
        (W/m³)")
    H_ml = models.FloatField("H (m.l.)",
        help_text="Producción de calor radiogénico en el manto litosférico \
        (W/m³)")
    delta = models.FloatField("δ",
        help_text="Factor de escala para el decaimiento exponencial de la \
        producción de calor radiogénico (km)")
    Tp = models.FloatField("Tₚ",
        help_text="Temperatura potencial del manto astenosférico en la \
        superficie (ºC)")
    G = models.FloatField("G",
        help_text="Gradiente adiabático (K/m)")
    kappa = models.FloatField("κ",
        help_text="Difusividad térmica (m²/s)")
    V = models.FloatField("V",
        help_text="Velocidad de convergencia (m/Ma)")
    dip = models.FloatField("α",
        help_text="Ángulo de subducción promedio")
    b = models.FloatField("b",
        help_text="Parametro adimensional")
    t = models.FloatField("t",
        help_text="Edad de la corteza oceánica subductada en la fosa (Ma)")
    D = models.FloatField("D",
        help_text="Parámetro que regula el decrecimiento exponencial del\
        stress de cizalle a lo largo del limite entre placas")

class MechanicalInput(models.Model):
    """
    Mechanical parameters defined by the user
    """
    Bs_t = models.FloatField("Bₛ (t)",
        help_text="Constante de tensión de Byerlee (MPa)")
    Bs_c = models.FloatField("Bₛ (c)",
        help_text="Constante de compresión de Byerlee (MPa)")
    e = models.FloatField("ė", help_text="Strain rate (s⁻¹)")
    R = models.FloatField("R",
        help_text="Constante universal de gases (J mol⁻¹ K⁻¹)")
    s_max = models.FloatField("σₘₐₓ", help_text="Máximo stress disponible (MPa)")
    Cs = models.ForeignKey('RheologicModel', on_delete=models.CASCADE,
        related_name='cs', verbose_name="C.S.",
        help_text="Modelo reológico para la corteza superior")
    Ci = models.ForeignKey('RheologicModel', on_delete=models.CASCADE,
        related_name='ci', verbose_name="C.I.",
        help_text="Modelo reológico para la corteza inferior")
    Ml = models.ForeignKey('RheologicModel', on_delete=models.CASCADE,
        related_name='ml', verbose_name="M.L.",
        help_text="Modelo reológico para el manto litosférico")
