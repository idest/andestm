import numpy as np
import matplotlib
#matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
import math
from pyevtk.hl import imageToVTK
import pickle

#data = np.loadtxt('/Users/inigo/projects/andestm-web/media/data/Modelo.dat')
data = np.loadtxt('/home/idest/projects/andestm/media/data/Model.dat')
tadata = np.loadtxt('/home/idest/projects/andestm/media/data/TrenchAge.dat')

def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)
def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)

class dotdict(dict):
    # dot.notation access to dictionary attributes"
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__

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
        self.slablabint_depth = self.__setSlabLabIntDepth()
        self.slablabint_topo = self.__setSlabLabIntTopo()
        self.slablabint_area = self.__setSlabLabIntArea()
        #self.GModel3D = self.__set3DGModel()
    def __setBoundary(self, depthData):
        return self.data.reshape2DData(depthData)[:, :, np.newaxis]
    def __set3DGeoModel(self):
        boundaries = self.getBoundaries()
        z = self.data.get3DGrid()[2]
        geomodel3D = self.data.mask3DArray(np.empty(z.shape)*np.nan,
                                           nanfill=True)
        for n in range(len(boundaries)):
            c = boundaries[n]
            with np.errstate(invalid='ignore'): ### ?? ###
                geomodel3D[z < c] = n + 1
        return geomodel3D
    def __setLayerThickness(self):
        pass
    def __getSlabLabIntIndex(self):
        # Gradients array
        g = np.gradient(self.z_sl, axis=0)
        # Min Gradient Indexes
        mingidx = np.nanargmin(np.ma.masked_invalid(g), axis=0)
        # Positive gradient boolean array (True where gradient > 0 ...)
        with np.errstate(invalid='ignore'):
            posg = g > -4e-01 # (... or where gradient gets very close to 0)
        # Ignore (mask) the values to the left of the minimum gradient
        i_idx = self.data.get2DIndexes()[0][:, :, np.newaxis]
        gmask = i_idx < mingidx
        maskedposg = np.ma.array(posg, mask=gmask)
        # Get index of first positive gradient (Slab/Lab idx)
        sli_idx = np.argmax(maskedposg, axis=0)
        # Get visual boolean representation of slablabidx
        # Z = np.zeros(g.shape)
        # Z[slablabidx, self.data.get2DIndexes()[1][0]] = 1
        # return Z.T
        return sli_idx
    def __setSlabLabIntDepth(self):
        sli_idx = self.__getSlabLabIntIndex()
        j_idx = self.data.get2DIndexes()[1][0]
        sli_depth = self.z_sl[sli_idx, j_idx]
        return sli_depth[np.newaxis, :, np.newaxis]
    def __setSlabLabIntTopo(self):
        sli_idx = self.__getSlabLabIntIndex()
        j_idx = self.data.get2DIndexes()[1][0]
        sli_topo = self.z_topo[sli_idx, j_idx]
        return sli_topo[np.newaxis, :, np.newaxis]
    def __setSlabLabIntArea(self):
        sli_idx = self.__getSlabLabIntIndex()
        i_idx = self.data.get2DIndexes()[0][:, :, np.newaxis]
        sli_area = np.zeros(self.data.get2DShape())[:, :, np.newaxis]
        sli_area[ i_idx > sli_idx] = 1
        return sli_area
    def __maskSlabLab(self, array3D, area):
        sli_area = self.slablabint_area
        lab_mask = sli_area == area
        lab_mask3D = np.zeros(self.data.get3DShape(), dtype=bool)
        lab_mask3D[:, :, :] = lab_mask
        masked_array = np.ma.array(array3D, mask=lab_mask3D)
        return masked_array
    def get3DGeoModel(self):
        return self.geomodel3D
    def getBoundaries(self):
        return [self.z_topo, self.z_icd, self.z_moho, self.z_sl]
    def getSlabLabIntDepth(self):
        return self.slablabint_depth
    def getSlabLabIntTopo(self):
        return self.slablabint_topo
    def getSlabLabIntArea(self):
        return self.slablabint_area
    def maskSlab(self, array3D):
        masked_array = self.__maskSlabLab(array3D, 0)
        return masked_array
    def maskLab(self, array3D):
        masked_array = self.__maskSlabLab(array3D, 1)
        return masked_array


class ThermalModel(Model3D):
    def __init__(self, geomodel, Tdata):
        self.geomodel = geomodel
        self.tdata = dotdict(Tdata)
        self.k = self.__setLayerProperty("k")
        self.H = self.__setLayerProperty("H")
        self.slablabint_temp = self.__setSlabLabIntTemperature()
        self.qzero = self.__setQZero()
        self.S = self.__setS()
        self.slablabint_sigma = self.__setSlabLabIntSigma()
        self.slab_sigma = self.__setSlabSigma()
        #self.slablab_temp = self.__setSlabLabTemp()

    def __setLayerProperty(self, prop):
        geomodel3D = self.geomodel.get3DGeoModel()
        boundaries = self.geomodel.getBoundaries()
        if prop == "k":
            propv = [self.tdata.k_cs, self.tdata.k_ci, self.tdata.k_ml]
            propfz = self.tdata.k_z
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
    def __getDelta(self):
        ### Work needs to be done here ###
        boundaries = self.geomodel.getBoundaries()
        if self.tdata.delta_icd is True:
            delta = boundaries[0] - boundaries[1]
        else:
            delta = self.tdata.delta
    def __getTrenchAge(self):
        if self.tdata.t_lat is True:
            trench_age = tadata[:, 1][np.newaxis, :, np.newaxis]
        else:
            trench_age = self.tdata.t
        return trench_age
    def __setSlabLabIntTemperature(self):
        sli_depth = self.geomodel.getSlabLabIntDepth()
        Tp = self.tdata.Tp
        G = self.tdata.G
        sli_temp = Tp + G * sli_depth
        return sli_temp
    def __setQZero(self):
        k = self.geomodel.maskLab(self.k)
        Tp = self.tdata.Tp
        kappa = self.tdata.kappa
        age = self.__getTrenchAge()
        print("k", k)
        print("Tp", Tp)
        print("kappa", kappa)
        print("t", age)
        qzero = (k * Tp)/np.sqrt(np.pi * kappa * age)
        return qzero
    def __setS(self):
        sli_depth = self.geomodel.getSlabLabIntDepth()
        sli_topo = self.geomodel.getSlabLabIntTopo()
        kappa = self.tdata.kappa
        V = self.tdata.V
        dip = self.tdata.dip
        b = self.tdata.b
        S = 1 + b * np.sqrt((sli_depth-sli_topo) * V * abs(np.sin(dip))/kappa)
        return S
    def __setSlabLabIntSigma(self):
        sli_temp = self.slablabint_temp
        sli_depth = self.geomodel.getSlabLabIntDepth()
        sli_topo = self.geomodel.getSlabLabIntTopo()
        k = self.geomodel.maskLab(self.k)
        kappa = self.tdata.kappa
        V = self.tdata.V
        qzero = self.qzero
        S = self.S
        sli_sigma = (sli_temp * S * k)/(V * (sli_depth-sli_topo)) - qzero/V
        return sli_sigma
    def __setSlabSigma(self):
        sli_sigma = self.slablabint_sigma
        print(sli_sigma.shape)
        sli_depth = self.geomodel.getSlabLabIntDepth()
        print(sli_depth.shape)
        sli_topo = self.geomodel.getSlabLabIntTopo()
        print(sli_topo.shape)
        z_sl = self.geomodel.getBoundaries()[3]
        z_topo = self.geomodel.getBoundaries()[0]
        D = self.tdata.D
        mu = sli_sigma / (1-np.exp(D))
        exp2 = (z_sl-z_topo)*D/(sli_depth-sli_topo)
        print(exp2.dtype)
        print(exp2.shape)
        exp = np.ones(self.geomodel.data.get2DShape())*1.03
        print(exp.dtype)
        print(exp.shape)
        self.geomodel.data.printdata('exp_slab_sigma', exp2)
        #slab_sigma = mu * (1 - np.exp((z_sl-z_topo)*D/(sli_depth-sli_topo)))
        #return slab_sigma
    def __getSlabTemp(self):
        sli_depth = self.geomodel.getSlabLabIntDepth()
        sli_topo = self.geomodel.getSlabLabIntTopo()
        k = self.geomodel.maskLab(self.k)
        V = self.tdata.V
        qzero = self.qzero
        S = self.S
        slab_sigma = self.slab_sigma
        slab_temp = (qzero + slab_sigma * V) * (sli_depth-sli_topo) / (k * S)
        return slab_temp
    def __getLabTemp(self):
        z_sl = self.geomodel.getBoundaries()[3]
        z_lab = self.geomodel.maskSlab(z_sl)
        Tp = self.tdata.Tp
        G = self.tdata.G
        lab_temp = Tp + G * z_lab
        return lab_temp
    def __setSlabLabTemp(self):
        slab_temp = self.__getSlabTemp().filled(0)
        lab_temp = self.__getLabTemp().filled(0)
        slablab_temp = np.zeros(self.data.get3DShape())
        slablab_temp[slab_temp != 0] = slab_temp[slab_temp != 0]
        slablab_temp[lab_temp != 0] = lab_temp[lab_temp != 0]
        return slablab_temp
        ###WORk IN PROGRESS###



A = Data(data,0.2,1)
#A.printdata("masked_data")
#A1 = A.get3DGrid()[0]
#print(A1.shape)
#A2 = np.swapaxes(A1,0,1)
#print(A2.shape)
#A.printdata('topslicex3', A2[:,:,0])
B = GeometricModel(A)
C = B.get3DGeoModel()
Tdata = load_obj('Tdata')
print('helo', Tdata)
D = ThermalModel(B, Tdata)
#A.printdata('slablabarea_4e01sa', B.getSlabLabArea().T, bool=True)

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
