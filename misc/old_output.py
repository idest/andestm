import numpy as np

def print_data(name, data, boolean=False):
    if boolean is True:
        np.savetxt(name, data, fmt="%1d", delimiter=" ")
    else:
        np.savetxt(name, data, fmt="%9.2e", delimiter="   ")


for n in np.arange(1000, 4500, 20):
    if n == 1000:
        file = np.loadtxt('prints/perfs-old/perf-' + str(n))[:, 6][:, np.newaxis]
    else:
        file2 = np.loadtxt('prints/perfs-old/perf-' + str(n))[:, 6][:, np.newaxis]
        file = np.append(file, file2, axis=1)
#print(file.shape)
#a = file == 0
#print(a.shape)
#print(a)
file[file == 0] = 1
file[file == 1] = 0
file[file == 2] = 1
print_data('oldareas', file.T, boolean=True)
