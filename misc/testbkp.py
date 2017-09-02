import numpy as np
import matplotlib
#matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
import math
from pyevtk.hl import imageToVTK

#data = np.loadtxt('/Users/inigo/projects/andestm-web/media/data/Modelo.dat')
data = np.loadtxt('/home/idest/projects/andestm/media/data/Modelo.dat')

class DataGrid(object):
    def __init__(self, data):
        """
        self.col = int(self.ceil - self.floor + 1) #Maximo rango de profundidades
        """
        self.xystep = 0.2
        self.zstep = 1

        # X Axis
        minlon = math.floor(np.nanmin(data[:, 0]))
        maxlon = math.ceil(np.nanmax(daNew Bookmarkta[:, 0]))
        self.xaxis = np.linspace(minlon, maxlon,
                                 num=(maxlon-minlon)/self.xystep+1,
                                 endpoint=True)
        # Y Axis
        minlat = math.floor(np.nanmin(daNew Bookmarkta[:, 1]))
        maxlat = math.ceil(np.nanmax(data[:, 1]))
        self.yaxis = np.linspace(maxlat, minlat,
                                 num=(abs(minlat-maxlat))/self.xystep+1,
                                 endpoint=True)
        # Z Axis
        minz = math.floor(np.nanmin(data[:, 2]))
        maxz = math.ceil(np.nanmax(data[:, 5]))
        print("maxz: ",maxz,"/ minz: ", minz)
        self.zaxis = np.linspace(maxz, minz,
                                 num=(abs(minz-maxz))/self.zstep+1,
                                 endpoint=True)
        print(self.zaxis)
        # 2DGrid (indexed using gird[y,x])
        self.X, self.Y = np.meshgrid(self.xaxis, self.yaxis)
        # 3DGrid (indexed using grid[y,x,z])
        self.XX, self.YY, self.ZZ = np.meshgrid(self.xaxis,
                                                self.yaxis,
                                                self.zaxis)
        print(self.ZZ)

class LitLayer(object):
    def __init__(self, datacol, grid):
        """data consist of 3 columns, x, y, and layer's depth"""
        self.Z = datacol.T.reshape(grid.X.shape)
    def delimit(self, idxs):
        rows = np.repeat(np.arange(len(idxs)), idxs)
        cols = np.ones(idxs.sum(), dtype=int)
        cols[np.cumsum(idxs)[:-1]] -= idxs[:-1]
        cols = np.cumsum(cols) - 1
        areas = np.ones((idxs.shape[0], self.Z.shape[1]))
        areas[rows, cols] = 0
        return areas

def save_matrix(z, name, *args, **kwargs):
    if args:
        cols = args[0].shape[0]
        rows = args[1].shape[0]
        xlabel = args[0].reshape(1, cols)
        ylabel = np.array([0])
        ylabel = np.append(ylabel, args[1])
        ylabel = ylabel.reshape(rows+1, 1)
        z = np.append(xlabel, z, axis=0)
        z = np.append(ylabel, z, axis=1)
    if 'bool' in kwargs and kwargs['bool'] is True:
        np.savetxt('misc/' + name, z, fmt="%1d", delimiter="   ")
    else:
        np.savetxt('misc/' + name, z, fmt="%9.2e", delimiter="   ")

def plot_matrix(x,y,matrix,colormap):
    fig = plt.figure()
    ax = fig.gca(projection='3d')
    #x = np.linspace(-5,5,100)
    #y = np.linspace(-5,5,100)
    #xx,yy = np.meshgrid(x,y)
    #z = -(xx**2 + yy**2)
    surf = ax.plot_surface(x, y, matrix, cmap=colormap,
                           vmin=np.nanmin(matrix), vmax=np.nanmax(matrix),
                           linewidth=0, antialiased=True)
    plt.show()
    #plt.imshow(AREAS, cmap='magma')
    #plt.show()

# Crear meshgrid
GRID = DataGrid(data)

# Seleccionar data correspondiente a LABSLAB
LS_DATA = data[:, 2]

# Crear matriz con geometria de LABSLAB
LABSLAB = LitLayer(LS_DATA, GRID)

M_DATA = data[:, 3]
MOHO = LitLayer(M_DATA, GRID)

ICD_DATA = data[:, 4]
ICD = LitLayer(ICD_DATA, GRID)

T_DATA = data[:, 5]
TOPO = LitLayer(T_DATA, GRID)

# Calcular gradiente de LABSLAB a lo largo de eje x
G = np.gradient(LABSLAB.Z, axis=1)

# Seleccionar indice del menor gradiente para cada latitud
IDXS = np.nanargmin(G[:-1, :], axis=1)

# Delimitar el area de la matriz LABSLAB segun la lista de indices anterior
AREAS = LABSLAB.delimit(IDXS)

# Guardar matrices
#save_matrix(LABSLAB.Z, 'matrix', GRID.xaxis, GRID.yaxis)
#save_matrix(G, 'gradientMatrix')
#save_matrix(IDXS, 'idxMinGradientMatrix')
#save_matrix(AREAS, 'areasMatrix', bool=True)
#save_matrix(data, 'data')
#plot_matrix(GRID.X, GRID.Y, TOPO.Z, cm.viridis_r)


LABSLAB3D = np.dstack([TOPO.Z]*1)

rndm = np.sin(GRID.XX) + np.sin(GRID.YY) + np.sin((GRID.ZZ)/5)*GRID.ZZ/100
print(rndm.shape)
imageToVTK("./block", pointData = {"elevation": rndm})
