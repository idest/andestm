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
ta = np.loadtxt('/home/idest/projects/andestm/media/data/PuntosFosaEdad.dat')

class Data(object):
    def __init__(self,data,xystep,zstep):
        self.data = data
        self.xystep = xystep
        self.zstep = zstep
        self.xaxis = self.__setAxis(values=self.data[:, 0])
        self.yaxis = self.__setAxis(values=self.data[:, 1], reversed=True)
        self.zaxis = self.__setAxis(values=self.data[:, 5], reversed=True,
                                    lowvalues=self.data[:, 2], zaxis=True)
        self.mask2D = self.__set2DMask()
        self.mask3D = self.__set3DMask()
        self.grid2D = self.__setGrid([self.xaxis, self.yaxis],
                                     mask=True)
        self.grid3D = self.__setGrid([self.xaxis, self.yaxis, self.zaxis],
                                     mask=True)
    def __setAxis(self, values, lowvalues=False, reversed=False, zaxis=False):
        if lowvalues is False:
            lowvalues = values
        maxv = math.ceil(np.nanmax(values))
        minv = math.floor(np.nanmin(lowvalues))
        if reversed == True:
            firstv, lastv = maxv, minv
        else:
            firstv, lastv = minv, maxv
        if zaxis == True:
            step = self.zstep
        else:
            step = self.xystep
        return np.linspace(firstv, lastv,
                           num=(abs(lastv-firstv))/step+1,
                           endpoint=True)
    def __set2DMask(self):
        # Use lab/slab data nan values as mask
        return np.isnan(self.reshape2DData(self.data[:, 2]))
    def __set3DMask(self):
        # Use lab/slab data nan values as mask
        mask2D = self.mask2D
        mask3D = np.zeros(self.get3DShape(), dtype=bool)
        mask3D[:, :, :] = mask2D[:, :, np.newaxis]
        return mask3D
    def __setGrid(self, axes, mask=False):
        grid = np.meshgrid(*[n for n in axes], indexing='ij')
        maskedgrid = []
        if mask is True:
            for n in grid:
                if len(n.shape) == 2:
                    maskedgrid.append(self.mask2DArray(n, nanfill=True))
                else:
                    maskedgrid.append(self.mask3DArray(n, nanfill=True))
            return maskedgrid
        else:
            return grid
    def getData(self):
        return self.data
    def getAxes(self):
        return [self.xaxis, self.yaxis, self.zaxis]
    def get2DShape(self):
        return (len(self.xaxis), len(self.yaxis))
    def get3DShape(self):
        return (len(self.xaxis), len(self.yaxis), len(self.zaxis))
    def get2DGrid(self):
        return self.grid2D
    def get3DGrid(self):
        return self.grid3D
    def get2DIndexes(self):
        return np.indices(self.get2DShape())
    def get3DIndexes(self):
        return np.indices(self.get3DShape())
    def reshape2DData(self, data2D):
        return data2D.T.reshape((len(self.yaxis), len(self.xaxis))).T
    def mask2DArray(self, array2D, nanfill=False):
        mask2D = np.ma.array(array2D, mask=self.mask2D)
        if nanfill is True:
            mask2D = mask2D.filled(np.nan)
        return mask2D
    def mask3DArray(self, array3D, nanfill=False):
        mask3D = np.ma.array(array3D, mask=self.mask3D)
        if nanfill is True:
            mask3D = mask3D.filled(np.nan)
        return mask3D
    def delimitArea(self):
        rows = np.repeat(np.arange(len(idxs)), idxs)
        cols = np.ones(idxs.sum(), dtype=int)
        cols[np.cumsum(idxs)[:-1]] -= idxs[:-1]
        cols = np.cumsum(cols) - 1
        areas = np.ones((idxs.shape[0], self.grid2D[2].shape[1]))
        areas[rows, cols] = 0
        return areas
    def printdata(self, name, data, bool=False):
        if bool is True:
            np.savetxt(name, data, fmt="%1d", delimiter=" ")
        else:
            np.savetxt(name, data, fmt="%9.2e", delimiter="   ")

class Model3D(object):
    def __init__(self):
        pass

class GeometricModel(Model3D):
    def __init__(self, data):
        self.data = data
        self.z_sl = self.__setBoundary(self.data.getData()[:, 2])
        self.z_moho = self.__setBoundary(self.data.getData()[:, 3])
        self.z_icd = self.__setBoundary(self.data.getData()[:, 4])
        self.z_topo = self.__setBoundary(self.data.getData()[:, 5])
        self.geomodel3D = self.__set3DGeoModel()
        self.slablabdepth = self.__setSlabLabDepth()
        self.slablabarea = self.__setSlabLabArea()
        #self.GModel3D = self.__set3DGModel()
    def __setBoundary(self, depthData):
        return self.data.reshape2DData(depthData)
    def __set3DGeoModel(self):
        boundaries = [self.z_topo, self.z_icd, self.z_moho, self.z_sl]
        z = self.data.get3DGrid()[2]
        geomodel3D = self.data.mask3DArray(np.empty(z.shape)*np.nan,
                                           nanfill=True)
        for n in range(len(boundaries)):
            c = boundaries[n][:, :, np.newaxis]
            with np.errstate(invalid='ignore'): ### ?? ###
                geomodel3D[z < c] = n + 1
        return geomodel3D
    def __setLayerThickness(self):
        pass
    def __getSlabLabIndex(self):
        # Gradients array
        g = np.gradient(self.z_sl, axis=0)
        # Min Gradient Indexes
        mingidx = np.nanargmin(np.ma.masked_invalid(g), axis=0)
        # Positive gradient boolean array (True where gradient > 0 ...)
        with np.errstate(invalid='ignore'):
            posg = g > -4e-01 # (... or where gradient gets very close to 0)
        # Ignore (mask) the values to the left of the minimum gradient
        gmask = self.data.get2DIndexes()[0] < mingidx
        maskedposg = np.ma.array(posg, mask=gmask)
        # Get index of first positive gradient (Slab/Lab idx)
        slablabidx = np.argmax(maskedposg, axis=0)
        # Get visual boolean representation of slablabidx
        # Z = np.zeros(g.shape)
        # Z[slablabidx, self.data.get2DIndexes()[1][0]] = 1
        # return Z.T
        return slablabidx
    def __setSlabLabDepth(self):
        jidxs = self.data.get2DIndexes()[1][0]
        slablabdepth = self.z_sl[self.__getSlabLabIndex(), jidxs]
        return slablabdepth
    def __setSlabLabArea(self):
        slablabarea = np.zeros(self.data.get2DShape())
        slablabarea[self.data.get2DIndexes()[0] > self.__getSlabLabIndex()] = 1
        return slablabarea
    def get3DGeoModel(self):
        return self.geomodel3D
    def getBoundaries(self):
        return [self.z_topo, self.z_icd, self.z_moho, self.z_sl]
    def getSlabLabDepth(self):
        return self.slablabdepth
    def getSlabLabArea(self):
        return self.slablabarea

A = Data(data,0.2,1)
#A.printdata("masked_data")
#A1 = A.get3DGrid()[0]
#print(A1.shape)
#A2 = np.swapaxes(A1,0,1)
#print(A2.shape)
#A.printdata('topslicex3', A2[:,:,0])
B = GeometricModel(A)
C = B.get3DGeoModel()
#A.printdata('slablabarea_4e01sa', B.getSlabLabArea().T, bool=True)

class ThermalModel(Model3D):
    def __init__(self, geomodel, Tdata):
        self.geomodel = geomodel
        self.tdata = Tdata
        self.K = __setLayerProperty("K")
        self.H = __setLayerProperty("H")
    def __setLayerProperty(self, prop):
        geomodel3D = self.geomodel.get3DGeoModel()
        boundaries = self.geomodel.getBoundaries()
        if prop == "K":
            propv = [self.tdata.K_cs, self.tdata.K_ci, self.tdata.K_ml]
            propfz = self.tdata.K_z
        elif prop == "H":
            propv = [self.tdata.H_cs, self.tdata.H_ci, self.tdata.H_ml]
            propfz = self.tdata.H_z
        if propfz is True:
            R = np.empty(geomodel3D.shape)*np.nan
            R[geomodel3D == 1] = propv[0]
            R[geomodel3D == 2] = propv[1]
            R[geomodel3D == 3] = propv[2]
        else:
            Rh = []
            h = [] #h = thickness
            while n < len(boundaries)-1:
                h.append(boundaries[n] - boundaries[n+1])
                Rh.append(propv[n]*h[n])
            R = (Rh.sum()/h.sum())[:,:,np.newaxis]
        return R
    def __setDelta(self):
        ### Work needs to be done here ###
        boundaries = self.geomodel.getBoundaries()
        if self.tdata.d_rad == 0:
            delta = boundaries[0] - boundaries[1]
        else:
            delta = d_rad
    def __getTrenchAge(self):
        if EF_lat is True:
            trenchage = ta[1]
        else:
            trenchage = self.tdata.EF
    def __getQZero(self):
        qzero = (self.K * self.tdata.T_p)/np.sqrt(np.pi * self.tdata.kpa *
                                                  self.__getTrenchAge())
        return qzero
    def __getS(self):
        slablabdepth = self.geomodel.getSlabLabDepth()
        topo = self.geomodel.getBoundaries()[0]
        s = 1 + self.tdata.b * np.sqrt(slablabdepth - topo) * self.tdata.V *
            abs(np.sin(self.tdata.dip) / self.tdata.kpa)
        return s
    def __getSlabLabTemp(self):
        slablabdepth = self.geomodel.getSlabLabDepth()
        slablabtemp = self.tdata.T_p + self.tdata.G_a * slablabdepth
        return slablabtemp
    def __getSigmaMax(self):
        slablabtemp = self.__getSlabLabTemp()
        slablabdepth = self.geomodel.getSlabLabDepth()
        topo = self.geomodel.getBoundaries()[0]
        sigmamax = (slablabtemp / (slablabdepth - slablabtemp) /
                   (self.tdata.V * self.tdata.__getS() * self.K) -
                   self.__getQZero() * self.tdata.kpa)
        return sigmamax
    def __getMu(self):
        mu = self.__getSigmaMax() / 1 - np.exp(self.tdata.D2)
        return mu
    def __getSigma(self):
        mu = self.__getMu()
        slablab = self.geomodel.getBoundaries()[3]
        topo = self.geomodel.getBoundaries()[0]
        slablabdepth = self.geomodel.getSlabLabDepth()
        sigma = mu * (1 - np.exp((slablab - topo)*self.tdata.D2 /
                      (slablabdepth - topo)))
        return sigma
    def __getSlabTemp(self):
        qzero = self.__getQZero()
        sigma = self.__getSigma()
        labslab = self.geomodel.getBoundaries()[3]
        topo = self.geomodel.getBoundaries()[0]
        s = self.__getS()
        K = self.K
        slabtemp = (qzero + sigma * self.tdata.V) * (labslab - topo) / (s * K)
        return slabtemp
    def __getLabTemp(self):
        labslab = self.geomodel.getBoundaries()[3]
        labtemp = self.tdata.T_p + self.tdata.G_a * labslab
        return labtemp
        ###WORk IN PROGRESS###



# for n in np.arange(1000, 4200, 20):
#     if n == 1000:
#         file = np.loadtxt('perfs-old/perf-' + str(n))[:, 6][:, np.newaxis]
#     else:
#         file2 = np.loadtxt('perfs-old/perf-' + str(n))[:, 6][:, np.newaxis]
#         file = np.append(file, file2, axis=1)
# #print(file.shape)
# #a = file == 0
# #print(a.shape)
# #print(a)
# file[file == 0] = 1
# file[file == 1] = 0
# file[file == 2] = 1
# A.printdata('oldareas', file.T, bool=True)

#C2 = np.swapaxes(B.get3DGeoModel(), 0,1)
#print(A.get3DGrid()[2].shape)
#C = A.printdata('topslicez', A.get3DGrid()[2][:,:,0])
#D = A.get3DGrid()[2].filled(np.nan)

#imageToVTK("./block", pointData = {"elevation": D})

#rndm = np.sin(A.get3DGrid()[0]) + np.sin(A.get3DGrid()[1]) + np.sin(A.get3DGrid()[2]/5)*A.get3DGrid()[2]/100
#rndm = rndm.filled(np.nan)
imageToVTK("./block", pointData = {"elevation": C})

"""
class DataGrid(object):
    def __init__(self, data):

        #self.col = int(self.ceil - self.floor + 1) #Maximo rango de profundidades

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
        #data consist of 3 columns, x, y, and layer's depth
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
"""
