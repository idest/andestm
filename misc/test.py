import numpy as np
# import matplotlib
# matplotlib.use('TkAgg')
# import matplotlib.pyplot as plt
# from mpl_toolkits.mplot3d import Axes3d
# from matplotlib import cm
import math
from pyevtk.hl import imageToVTK
import pickle

# data = np.loadtxt('/Users/inigo/projects/andestm-web/media/data/Modelo.dat')
gm_data = np.loadtxt('/home/idest/projects/andestm/media/data/Model.dat')
ta_data = np.loadtxt('/home/idest/projects/andestm/media/data/TrenchAge.dat')


def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)


class DotDict(dict):
    # dot.notation access to dictionary attributes"
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__


class Data(object):

    @staticmethod
    def print_data(name, data, boolean=False):
        if boolean is True:
            np.savetxt(name, data, fmt="%1d", delimiter=" ")
        else:
            np.savetxt(name, data, fmt="%9.2e", delimiter="   ")

    def __init__(self, data, xy_step, z_step):
        self.data = data
        self.xy_step = xy_step
        self.z_step = z_step
        self.x_axis = self.__set_axis(values=self.data[:, 0])
        self.y_axis = self.__set_axis(values=self.data[:, 1], revert=True)
        self.z_axis = self.__set_axis(values=self.data[:, 5], revert=True,
                                      low_values=self.data[:, 2],
                                      z_axis=True)
        self.mask_2d = self.__set_2d_mask()
        self.mask_3d = self.__set_3d_mask()
        self.grid2d = self.__set_grid([self.x_axis, self.y_axis],
                                      mask=True)
        self.grid3d = self.__set_grid(
            [self.x_axis, self.y_axis, self.z_axis],
            mask=True)
        pass

    def __set_axis(self, values, low_values=False, revert=False,
                   z_axis=False):
        if low_values is False:
            low_values = values
        max_v = math.ceil(np.nanmax(values))
        min_v = math.floor(np.nanmin(low_values))
        if revert is True:
            first_v, last_v = max_v, min_v
        else:
            first_v, last_v = min_v, max_v
        if z_axis is True:
            step = self.z_step
        else:
            step = self.xy_step
        return np.linspace(first_v, last_v,
                           num=(abs(last_v - first_v)) / step + 1,
                           endpoint=True)

    def __set_2d_mask(self):
        lab_slab_data = self.reshape_2d_data(self.data[:, 2])
        g = np.gradient(lab_slab_data, axis=0)
        with np.errstate(invalid='ignore'):
            high_g = np.absolute(g) > 1  # type: np.ndarray
        trench_start = np.argmax(high_g, axis=0)
        i_idx = self.get_2d_indexes()[0]
        mask_2d = np.zeros(self.get_2d_shape())
        mask_2d[np.isnan(lab_slab_data)] = 1
        mask_2d[i_idx < trench_start] = 1
        return mask_2d

    def __set_3d_mask(self):
        # Use lab/slab data nan values as mask
        mask_2d = self.mask_2d
        mask_3d = np.zeros(self.get_3d_shape(), dtype=bool)
        mask_3d[:, :, :] = mask_2d[:, :, np.newaxis]
        return mask_3d

    def __set_grid(self, axes, mask=False):
        grid = np.meshgrid(*[n for n in axes], indexing='ij')
        masked_grid = []
        if mask is True:
            for n in grid:
                if len(n.shape) == 2:
                    masked_grid.append(
                        self.mask_2d_array(n, nan_fill=True))
                else:
                    masked_grid.append(
                        self.mask_3d_array(n, nan_fill=True))
            return masked_grid
        else:
            return grid

    def get_data(self):
        return self.data

    def get_axes(self):
        return [self.x_axis, self.y_axis, self.z_axis]

    def get_2d_shape(self):
        return len(self.x_axis), len(self.y_axis)

    def get_3d_shape(self):
        return len(self.x_axis), len(self.y_axis), len(self.z_axis)

    def get_2d_grid(self):
        return self.grid2d

    def get_3d_grid(self):
        return self.grid3d

    def get_2d_indexes(self):
        return np.indices(self.get_2d_shape())

    def get_3d_indexes(self):
        return np.indices(self.get_3d_shape())

    def reshape_2d_data(self, data2d):
        return data2d.T.reshape((len(self.y_axis), len(self.x_axis))).T

    def mask_2d_array(self, array_2d, nan_fill=False):
        mask_2d = np.ma.array(array_2d, mask=self.mask_2d)
        if nan_fill is True:
            mask_2d = mask_2d.filled(np.nan)
        return mask_2d

    def mask_3d_array(self, array_3d, nan_fill=False):
        mask_3d = np.ma.array(array_3d, mask=self.mask_3d)
        if nan_fill is True:
            mask_3d = mask_3d.filled(np.nan)
        return mask_3d

    def extract_2d_surface(self, z_2d, array_3d):
        z_2d = np.ceil(z_2d)
        z_3d = self.get_3d_grid()[2]
        a = z_3d != z_2d[:, :, np.newaxis]
        array_3d = np.copy(array_3d)
        array_3d[a] = 0
        surface_2d = np.sum(array_3d, axis=2)
        surface_2d[surface_2d == 0] = np.nan
        return surface_2d

    def delimit_area(self, idxs):
        rows = np.repeat(np.arange(len(idxs)), idxs)
        cols = np.ones(idxs.sum(), dtype=int)
        cols[np.cumsum(idxs)[:-1]] -= idxs[:-1]
        cols = np.cumsum(cols) - 1
        areas = np.ones((idxs.shape[0], self.grid2d[2].shape[1]))
        areas[rows, cols] = 0
        return areas


class Model3d(object):

    def __init__(self):
        pass


class GeometricModel(Model3d):
    def __init__(self, data):
        super().__init__()
        self.data = data
        self.z_sl = self.__set_boundary(self.data.get_data()[:, 2])
        self.z_moho = self.__set_boundary(self.data.get_data()[:, 3])
        self.z_icd = self.__set_boundary(self.data.get_data()[:, 4])
        self.z_topo = self.__set_boundary(self.data.get_data()[:, 5])
        self.geo_model_3d = self.__set_3d_geo_model()
        self.slab_lab_int_index = self.__get_slab_lab_int_index()
        self.slab_lab_int_depth = self.__set_slab_lab_int_depth()
        self.slab_lab_int_topo = self.__set_slab_lab_int_topo()
        self.slab_lab_int_area = self.__set_slab_lab_int_area()
        # self.GModel3d = self.__set3dGModel()

    def __set_boundary(self, depth_data):
        return self.data.reshape_2d_data(depth_data)

    def __set_3d_geo_model(self):
        boundaries = self.get_boundaries()
        z = self.data.get_3d_grid()[2]
        geo_model_3d = self.data.mask_3d_array(np.empty(z.shape) * np.nan,
                                               nan_fill=True)
        for n in range(len(boundaries)):
            c = boundaries[n][:, :, np.newaxis]
            if n < (len(boundaries) - 1):
                a = n + 1
            else:
                a = np.nan
            with np.errstate(invalid='ignore'):  # ?? ###
                geo_model_3d[z < c] = a
        return geo_model_3d

    def __set_layer_thickness(self):
        pass

    def __get_slab_lab_int_index(self):
        # Gradients array
        g = np.gradient(self.z_sl, axis=0)
        # Min Gradient Indexes
        min_g_idx = np.nanargmin(np.ma.masked_invalid(g), axis=0)
        # Positive gradient boolean array (True where gradient > 0 ...)
        with np.errstate(invalid='ignore'):
            pos_g = g > -4e-01  # (... or where gradient gets very close to 0)
        # Ignore (mask) the values to the left of the minimum gradient
        i_idx = self.data.get_2d_indexes()[0]
        g_mask = i_idx < min_g_idx
        masked_pos_g = np.ma.array(pos_g, mask=g_mask)
        # Get index of first positive gradient (Slab/Lab idx)
        sli_idx = np.argmax(masked_pos_g, axis=0)
        # Get visual boolean representation of sli_idx
        # Z = np.zeros(g.shape)
        # Z[sli_idx, self.data.get_2d_indexes()[1][0]] = 1
        # return Z.T
        return sli_idx

    def __set_slab_lab_int_depth(self):
        sli_idx = self.__get_slab_lab_int_index()
        j_idx = self.data.get_2d_indexes()[1][0]
        sli_depth = self.z_sl[sli_idx, j_idx]
        return sli_depth

    def __set_slab_lab_int_topo(self):
        sli_idx = self.__get_slab_lab_int_index()
        j_idx = self.data.get_2d_indexes()[1][0]
        sli_topo = self.z_topo[sli_idx, j_idx]
        return sli_topo

    def __set_slab_lab_int_area(self):
        sli_idx = self.__get_slab_lab_int_index()
        i_idx = self.data.get_2d_indexes()[0]
        sli_area = np.zeros(self.data.get_2d_shape())
        sli_area[i_idx > sli_idx] = 1
        return sli_area

    def get_3d_geo_model(self):
        return self.geo_model_3d

    def get_boundaries(self):
        return [self.z_topo, self.z_icd, self.z_moho, self.z_sl]

    def get_slab_lab_int_depth(self):
        return self.slab_lab_int_depth

    def get_slab_lab_int_topo(self):
        return self.slab_lab_int_topo

    def get_slab_lab_int_area(self):
        return self.slab_lab_int_area

    def set_layer_property(self, cs, ci, ml):
        r = np.empty(self.geo_model_3d.shape) * np.nan
        r[self.geo_model_3d == 1] = cs
        r[self.geo_model_3d == 2] = ci
        r[self.geo_model_3d == 3] = ml
        return r


class ThermalModel(Model3d):

    @staticmethod
    def __calc_lab_temp(tp, g, depth):
        lab_temp = tp + g * depth
        return lab_temp

    @staticmethod
    def __calc_q_zero(k, tp, kappa, age):
        q_zero = (k * tp) / np.sqrt(np.pi * kappa * age)
        return q_zero

    @staticmethod
    def __calc_s(depth, topo, kappa, v, dip, b):
        s = 1. + (b * np.sqrt((abs(depth - topo) * 1.e3)
                              * v * abs(np.sin(dip)) / kappa))
        return s

    @staticmethod
    def __calc_slab_lab_int_sigma(sli_depth, sli_topo, sli_temp, sli_s,
                                  sli_k,
                                  sli_q_zero, v):
        sli_sigma = ((sli_temp * sli_s * sli_k)
                     / (v * abs(sli_depth - sli_topo) * 1.e3)
                     - sli_q_zero / v)
        return sli_sigma

    @staticmethod
    def __calc_slab_sigma(depth, topo, sli_depth, sli_topo, sli_sigma, d):
        mu = sli_sigma / (1. - np.exp(d))
        # print(abs(depth-topo)*1.e3 * d/ abs())
        slab_sigma = mu * (1. - np.exp(abs(depth - topo) * 1.e3 * d
                                       / (
                                       abs(sli_depth - sli_topo) * 1.e3)))
        return slab_sigma

    @staticmethod
    def __calc_slab_temp(depth, topo, q_zero, slab_sigma, v, k, s):
        slab_temp = ((q_zero + slab_sigma * v) * abs(depth - topo) * 1.e3
                     / (k * s))
        return slab_temp

    @staticmethod
    def __calc_geotherm(h, delta, k, z, z_topo, z_sl, temp_sl):
        z = z * 1.e3
        z_topo = z_topo * 1.e3
        z_sl = z_sl * 1.e3
        rad_temp = ((h*delta**2)/k) * (np.exp(z_topo/delta) - np.exp(z/delta))
        base_temp = temp_sl - ((h * delta ** 2) / k) * (np.exp(z_topo / delta)
                                                        - np.exp(z_sl / delta))
        geotherm = rad_temp + (abs(z - z_topo) / abs(z_sl-z_topo)) * base_temp
        return geotherm

    def __init__(self, geo_model, t_input):
        super().__init__()
        self.geo_model = geo_model
        self.vars = DotDict(self.__set_variables(t_input))
        self.slab_lab_int_temp = self.__set_slab_lab_int_temperature()
        self.slab_lab_int_sigma = self.__set_slab_lab_int_sigma()
        self.slab_sigma = self.__set_slab_sigma()
        self.slab_temp = self.__set_slab_temp()
        self.lab_temp = self.__set_lab_temp()
        self.slab_lab_temp = self.__set_slab_lab_temp()
        self.geotherm = self.__set_geotherm()

    def __set_k_or_h(self, t_input, prop):
        boundaries = self.geo_model.get_boundaries()
        prop_v = None
        prop_fz = None
        if prop == "k":
            prop_v = [t_input.k_cs, t_input.k_ci, t_input.k_ml]
            prop_fz = t_input.k_z
        elif prop == "h":
            prop_v = [t_input.H_cs, t_input.H_ci, t_input.H_ml]
            prop_fz = t_input.H_z
        if prop_fz is True:
            r = self.geo_model.set_layer_property(prop_v[0], prop_v[1],
                                                  prop_v[2])
        else:
            rh = []
            h = []  # h = thickness
            while n < len(boundaries) - 1:
                h.append(boundaries[n] - boundaries[n + 1])
                rh.append(prop_v[n] * h[n])
            r = (rh.sum() / h.sum())[:, :, np.newaxis]
        return r

    def __set_delta(self, t_input):
        # Work needs to be done here
        boundaries = self.geo_model.get_boundaries()
        if t_input.delta_icd is True:
            delta = boundaries[0] - boundaries[1]
        else:
            delta = t_input.delta
        return delta

    def __set_trench_age(self, t_input):
        if t_input.t_lat is True:
            trench_age = ta_data[:, 1]
        else:
            trench_age = t_input.t
        return trench_age

    def __set_variables(self, t_input):
        t_input = DotDict(t_input)
        t_vars = {
            'k_cs': t_input['k_cs'],
            'k_ci': t_input['k_ci'],
            'k_ml': t_input['k_ml'],
            'k': self.__set_k_or_h(t_input, 'k'),
            'h_cs': t_input['H_cs'],
            'h_ci': t_input['H_ci'],
            'h_ml': t_input['H_ml'],
            'h': self.__set_k_or_h(t_input, 'h'),
            'delta': self.__set_delta(t_input) * 1.e3,
            'tp': t_input['Tp'],
            'g': t_input['G'],
            'kappa': t_input['kappa'],
            'v': t_input['V'] / (1.e6*365.*24.*60.*60.),
            'dip': t_input['dip'],
            'b': t_input['b'],
            't': self.__set_trench_age(t_input) * (1.e6*365.*24.*60.*60.),
            'd': t_input['D']
        }
        return t_vars

    def __set_slab_lab_int_temperature(self):
        sli_depth = self.geo_model.get_slab_lab_int_depth()
        tp = self.vars.tp
        g = self.vars.g
        sli_temp = self.__calc_lab_temp(tp, g, sli_depth)
        return sli_temp

    def __set_slab_lab_int_sigma(self):
        sli_depth = self.geo_model.get_slab_lab_int_depth()
        sli_topo = self.geo_model.get_slab_lab_int_topo()
        sli_temp = self.slab_lab_int_temp
        kappa = self.vars.kappa
        v = self.vars.v
        dip = self.vars.dip
        b = self.vars.b
        sli_s = self.__calc_s(sli_depth, sli_topo, kappa, v, dip, b)
        if self.vars.k.shape:
            sli_k = self.vars.k_ml
        else:
            sli_k = self.vars.k
        tp = self.vars.tp
        t = self.vars.t
        sli_q_zero = self.__calc_q_zero(sli_k, tp, kappa, t)
        sli_sigma = self.__calc_slab_lab_int_sigma(sli_depth, sli_topo,
                                                   sli_temp, sli_s, sli_k,
                                                   sli_q_zero, v)
        return sli_sigma

    def __set_slab_sigma(self):
        z_sl = self.geo_model.get_boundaries()[3]
        z_topo = self.geo_model.get_boundaries()[0]
        sli_depth = self.geo_model.get_slab_lab_int_depth()
        sli_topo = self.geo_model.get_slab_lab_int_topo()
        sli_sigma = self.slab_lab_int_sigma
        d = self.vars.d
        slab_sigma = self.__calc_slab_sigma(z_sl, z_topo, sli_depth,
                                            sli_topo,
                                            sli_sigma, d)
        return slab_sigma

    def __set_slab_temp(self):
        z_sl = self.geo_model.get_boundaries()[3]
        z_topo = self.geo_model.get_boundaries()[0]
        if self.vars.k.shape:
            slab_k = self.geo_model.data.extract_2d_surface(z_sl,
                                                            self.vars.k)
        else:
            slab_k = self.vars.k
        tp = self.vars.tp
        kappa = self.vars.kappa
        v = self.vars.v
        t = self.vars.t
        q_zero = self.__calc_q_zero(slab_k, tp, kappa, t)
        dip = self.vars.dip
        b = self.vars.b
        s = self.__calc_s(z_sl, z_topo, kappa, v, dip, b)
        slab_sigma = self.slab_sigma
        slab_temp = self.__calc_slab_temp(z_sl, z_topo, q_zero, slab_sigma,
                                          v,
                                          slab_k, s)
        return slab_temp

    def __set_lab_temp(self):
        z_sl = self.geo_model.get_boundaries()[3]
        # z_lab = self.geo_model.mask_slab(z_sl)
        tp = self.vars.tp
        g = self.vars.g
        lab_temp = self.__calc_lab_temp(tp, g, z_sl)
        return lab_temp

    def __set_slab_lab_temp(self):
        a = self.geo_model.get_slab_lab_int_area()
        b = a == 0
        c = a == 1
        slab_temp = self.slab_temp  # type: np.ndarray
        lab_temp = self.lab_temp  # type: np.ndarray
        slab_lab_temp = np.zeros(self.geo_model.data.get_2d_shape())
        slab_lab_temp[b] = slab_temp[b]
        slab_lab_temp[c] = lab_temp[c]
        print(slab_lab_temp.shape)
        return slab_lab_temp

    def __set_geotherm(self):
        h = self.vars.h
        k = self.vars.k
        if self.vars.delta.shape:
            delta = self.vars.delta[:, :, np.newaxis]
        else:
            delta = self.vars.delta
        z = self.geo_model.data.get_3d_grid()[2]
        z_topo = self.geo_model.get_boundaries()[0][:, :, np.newaxis]
        z_sl = self.geo_model.get_boundaries()[3][:, :, np.newaxis]
        temp_sl = self.slab_lab_temp[:, :, np.newaxis]
        geotherm = self.__calc_geotherm(h, delta, k, z, z_topo, z_sl,
                                        temp_sl)
        return geotherm

    def get_geotherm(self):
        return self.geotherm


class MechanicModel(Model3d):

    @staticmethod
    def __calc_brittle_yield_strength(bs, depth):
        bys = bs * (depth * 1.e3) * 1.e-6
        return bys

    @staticmethod
    def __calc_ductile_yield_strength(es, n, a, h, r, temp):
        dys = (es / a) ** (1 / n) * np.exp(h / (n * r * temp)) * 1.e-6
        return dys

    def __init__(self, geo_model, thermal_model, m_input):
        super().__init__()
        self.geo_model = geo_model
        self.thermal_model = thermal_model
        self.vars = DotDict(self.__set_variables(m_input))
        self.bys_t, self.bys_c = self.__set_brittle_yield_strength()
        self.dys = self.__set_ductile_yield_strength()
        self.yse_t, self.yse_c = self.__set_yield_strength_envelope()

    def __get_rheologic_vars(self, rock_id):
        rock = RheologicModel.objects.get(name=rock_id)
        rock_dic = {
            'n': rock.n,
            'a': rock.A,
            'h': rock.H,
        }
        return DotDict(rock_dic)

    def __set_variables(self, m_input):
        m_input = DotDict(m_input)
        m_vars = {
            'bs_t': m_input['Bs_t'],
            'bs_c': m_input['Bs_c'],
            'e': m_input['e'],
            'r': m_input['R'],
            's_max': m_input['s_max'],
            'cs': self.__get_rheologic_vars(m_input['Cs']),
            'ci': self.__get_rheologic_vars(m_input['Ci']),
            'ml': self.__get_rheologic_vars(m_input['Ml'])
        }
        return m_vars

    def __set_brittle_yield_strength(self):
        bs_t = self.vars.bs_t
        bs_c = self.vars.bs_c
        depth = self.geo_model.data.get_3d_grid()[2]
        bys_t = self.__calc_brittle_yield_strength(bs_t, depth)
        bys_c = self.__calc_brittle_yield_strength(bs_c, depth)
        return bys_t, bys_c

    def __set_ductile_yield_strength(self):
        e = self.vars.e
        r = self.vars.r
        temp = self.thermal_model.get_geotherm()
        cs = self.vars.cs
        ci = self.vars.ci
        ml = self.vars.ml
        n = self.geo_model.set_layer_property(cs.n, ci.n, ml.n)
        a = self.geo_model.set_layer_property(cs.a, ci.a, ml.a)
        h = self.geo_model.set_layer_property(cs.h, ci.h, ml.h)
        dys = self.__calc_ductile_yield_strength(e, n, a, h, r, temp)
        return dys

    def __set_yield_strength_envelope(self):
        bys_t = self.bys_t  # type: np.ndarray
        bys_c = self.bys_c  # type: np.ndarray
        dys = self.dys  # type: np.ndarray
        yse_t = np.where(bys_t < dys, bys_t, dys)
        yse_c = np.where(bys_c > dys, bys_c, dys)
        return yse_t, yse_c

        # ##WORk IN PROGRESS###


A = Data(gm_data, 0.2, 1)
# A.print_data("masked_data")
# A1 = A.get_3d_grid()[0]
# print(A1.shape)
# A2 = np.swapaxes(A1,0,1)
# print(A2.shape)
# A.print_data('topslicex3', A2[:,:,0])
B = GeometricModel(A)
C = B.get_3d_geo_model()
t_data = load_obj('t_data')
# print('helo', t_data)
D = ThermalModel(B, t_data)
E = D.get_geotherm()
m_data = load_obj('m_data')
F = MechanicModel(B, D, m_data)

#imageToVTK("./geotherm", pointData={"temperature": E})

#
# A.print_data('slablabarea_4e01sa', B.getSlabLabArea().T, boolean=True)

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
# A.print_data('oldareas', file.T, boolean=True)

# C2 = np.swapaxes(B.get_3d_geo_model(), 0,1)
# print(A.get_3d_grid()[2].shape)
# C = A.print_data('topslicez', A.get_3d_grid()[2][:,:,0])
# D = A.get_3d_grid()[2].filled(np.nan)

# imageToVTK("./block", point_data = {"elevation": D})

# rndm = np.sin(A.get_3d_grid()[0]) + np.sin(A.get_3d_grid()[1]) \
# + np.sin(A.get_3d_grid()[2]/5)*A.get_3d_grid()[2]/100
# rndm = rndm.filled(np.nan)
# imageToVTK("./block", point_data = {"elevation": C})

"""
class DataGrid(object):
    def __init__(self, data):

        #self.col = int(self.ceil - self.floor + 1) #Maximo rango de 
                                                    #profundidades

        self.xy_step = 0.2
        self.z_step = 1

        # X Axis
        minlon = math.floor(np.nanmin(data[:, 0]))
        maxlon = math.ceil(np.nanmax(daNew Bookmarkta[:, 0]))
        self.x_axis = np.linspace(minlon, maxlon,
                                 num=(maxlon-minlon)/self.xy_step+1,
                                 endpoint=True)
        # Y Axis
        minlat = math.floor(np.nanmin(daNew Bookmarkta[:, 1]))
        maxlat = math.ceil(np.nanmax(data[:, 1]))
        self.y_axis = np.linspace(maxlat, minlat,
                                 num=(abs(minlat-maxlat))/self.xy_step+1,
                                 endpoint=True)
        # Z Axis
        minz = math.floor(np.nanmin(data[:, 2]))
        maxz = math.ceil(np.nanmax(data[:, 5]))
        print("maxz: ",maxz,"/ minz: ", minz)
        self.z_axis = np.linspace(maxz, minz,
                                 num=(abs(minz-maxz))/self.z_step+1,
                                 endpoint=True)
        print(self.z_axis)
        # 2dGrid (indexed using gird[y,x])
        self.X, self.Y = np.meshgrid(self.x_axis, self.y_axis)
        # 3dGrid (indexed using grid[y,x,z])
        self.XX, self.YY, self.ZZ = np.meshgrid(self.x_axis,
                                                self.y_axis,
                                                self.z_axis)
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
#save_matrix(LABSLAB.Z, 'matrix', GRID.x_axis, GRID.y_axis)
#save_matrix(G, 'gradientMatrix')
#save_matrix(IDXS, 'idxMinGradientMatrix')
#save_matrix(AREAS, 'areasMatrix', bool=True)
#save_matrix(data, 'data')
#plot_matrix(GRID.X, GRID.Y, TOPO.Z, cm.viridis_r)


LABSLAB3d = np.dstack([TOPO.Z]*1)

rndm = np.sin(GRID.XX) + np.sin(GRID.YY) + np.sin((GRID.ZZ)/5)*GRID.ZZ/100
print(rndm.shape)
imageToVTK("./block", point_data = {"elevation": rndm})
"""
