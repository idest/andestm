""" Computations """
import math
import numpy as np
from .models import GeometricModel, RheologicModel

GM = GeometricModel.objects.get(pk=1)
GD = np.loadtxt(GM.file.path)

class DataGrid(object):
    def __init__(self, data):
        """
        self.col = int(self.ceil - self.floor + 1) #Maximo rango de profundidades
        """
        self.xystep = 0.2
        self.zstep = 1
        # X Axis
        minlon = math.floor(np.nanmin(data[:, 0]))
        maxlon = math.ceil(np.nanmax(data[:, 0]))
        self.xaxis = np.linspace(minlon, maxlon,
                                 num=(maxlon-minlon)/self.xystep+1,
                                 endpoint=True)
        # Y Axis
        minlat = math.floor(np.nanmin(data[:, 1]))
        maxlat = math.ceil(np.nanmax(data[:, 1]))
        self.yaxis = np.linspace(maxlat, minlat,
                                 num=(abs(minlat-maxlat))/self.xystep+1,
                                 endpoint=True)
        # Z Axis
        minz = math.floor(np.nanmin(data[:, 2]))
        maxz = math.ceil(np.nanmax(data[:, 5]))
        self.zaxis = np.linspace(minz, maxz,
                                 num=(maxz-minz)/self.zstep+1,
                                 endpoint=True)
        # 2DGrid (indexed using gird[y,x])
        self.X, self.Y = np.meshgrid(self.xaxis, self.yaxis)
        # 3DGrid (indexed using grid[y,x,z])
        self.XX, self.YY, self.ZZ = np.meshgrid(self.xaxis,
                                                self.yaxis,
                                                self.zaxis)

class LitLayer(object):
    def __init__(self, datacol, grid):
        """datacol corresponds to a column of data, except columns 0 and 1"""
        self.Z = datacol.T.reshape(grid.X.shape)
    def delimit(self, idxs):
        rows = np.repeat(np.arange(len(idxs)), idxs)
        cols = np.ones(idxs.sum(), dtype=int)
        cols[np.cumsum(idxs)[:-1]] -= idxs[:-1]
        cols = np.cumsum(cols) - 1
        areas = np.ones((idxs.shape[0], self.Z.shape[1]))
        areas[rows, cols] = 0
        return areas

def compute(Tdata, Mdata):
    """ do computations """
    grid = DataGrid(GD)
    output = {}
    output['shape'] = grid.XX.shape
    output['firstx'] = grid.XX[0, 0, 0]
    output['lastx'] = grid.XX[0, -1, 0]
    output['firsty'] = grid.YY[0, 0, 0]
    output['lasty'] = grid.YY[-1, 0, 0]
    output['firstz'] = grid.ZZ[0, 0, 0]
    output['lastz'] = grid.ZZ[0, 0, -1]
    return output
