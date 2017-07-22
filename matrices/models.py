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
    lat = models.FloatField()
    age = models.FloatField()

    def __str__(self):
        return self.lat

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
    K_z = models.BooleanField("K = f(z)",
        help_text="¿Usar K en función de la profundidad?")
    H_z = models.BooleanField("H = f(z)",
        help_text="¿Usar H en función de la profundidad?")
    EF_lat = models.BooleanField("EF = f(lat)",
        help_text="¿Usar EF en función de la latitud?")
    EF = models.FloatField("EF",
        help_text="Edad de la corteza oceánica en la fosa (Ma)")
    K_cs = models.FloatField("K (cs)",
        help_text="Conductividad térmica corteza sup. (W/mK)")
    K_ci = models.FloatField("K (ci)",
        help_text="Conductividad térmica corteza inf. (W/mK)")
    K_ml = models.FloatField("K (ml)",
        help_text="Conductividad térmica manto litosférico (W/mK)")
    H_cs = models.FloatField("H (cs)",
        help_text="Calor radiogénico corteza sup. (W/m3)")
    H_ci = models.FloatField("H (ci)",
        help_text="Calor radiogénico corteza inf. (W/m3)")
    H_ml = models.FloatField("H (ml)",
        help_text="Calor radiogénico manto litosférico (W/m3)")
    kpa = models.FloatField("kpa",
        help_text="Difusividad térmica (m2/s)")
    T_p = models.FloatField("Tp",
        help_text="Temperatura potencial del manto (C)")
    G_a = models.FloatField("Ga",
        help_text="Gradiente adiabático (K/m)")
    V = models.FloatField("V",
        help_text="Velocidad de convergencia (m/Ma)")
    b = models.FloatField("b",
        help_text="Parametro adimensional")
    dip = models.FloatField("dip",
        help_text="Ángulo de subduccion")
    D2 = models.FloatField("D2",
        help_text="Constante de proporcionalidad adimensional")
    d_rad = models.FloatField("Drad",
        help_text="Decaimiento radiogénico (km)")

class MechanicalInput(models.Model):
    """
    Mechanical parameters defined by the user
    """
    Bs_t = models.FloatField("Bs (t)",
        help_text="Constante de tensión de Byerlee (MPa)")
    Bs_c = models.FloatField("Bs (c)",
        help_text="Constante de compresión de Byerlee (MPa)")
    e = models.FloatField("e", help_text="Strain rate (s-1)")
    R = models.FloatField("R",
        help_text="Constante universal de gases (J mol-1 K-1)")
    mx_s = models.FloatField("S max.", help_text="Máximo stress disponible (MPa)")
    Cs = models.ForeignKey('RheologicModel', on_delete=models.CASCADE,
        related_name='cs', verbose_name="C.S.",
        help_text="Modelo reológico para la corteza superior")
    Ci = models.ForeignKey('RheologicModel', on_delete=models.CASCADE,
        related_name='ci', verbose_name="C.I.",
        help_text="Modelo reológico para la corteza inferior")
    Ml = models.ForeignKey('RheologicModel', on_delete=models.CASCADE,
        related_name='ml', verbose_name="M.L.",
        help_text="Modelo reológico para el manto litosférico")
