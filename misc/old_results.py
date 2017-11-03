import numpy as np

for n in np.arange(1000, 4500, 20):
    if n == 1000:
        Z = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Z')[:, np.newaxis, :]
        Qi = np.loadtxt('prints/old_results_T/perf-'+str(n)+'/Qi')[:, np.newaxis, :]
        S = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/S')[:, np.newaxis, :]
        Tsl = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Tsl')[:, np.newaxis, :]
        sigma_max = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/sigma_max')[:, np.newaxis, :]
        mu = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/mu')[:, np.newaxis, :]
        sigma = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/sigma')[:, np.newaxis, :]
        Tslab = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Tslab')[:, np.newaxis, :]
        Tlla = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Tlla')[:, np.newaxis, :]
        T = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/T')[:, np.newaxis, :]
        Q = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Q')[:, np.newaxis, :]
        Zflla = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Zflla')
        Zflla = np.repeat(Zflla, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        Zs = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Zs')
        Zs = np.repeat(Zs, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        delta = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/delta')
        delta = np.repeat(delta, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        Zsl = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Zsl')
        Zsl = np.repeat(Zsl, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
    else:
        Z2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Z')[:, np.newaxis, :]
        Qi2 = np.loadtxt('prints/old_results_T/perf-'+str(n)+'/Qi')[:, np.newaxis, :]
        S2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/S')[:, np.newaxis, :]
        Tsl2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Tsl')[:, np.newaxis, :]
        sigma_max2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/sigma_max')[:, np.newaxis, :]
        mu2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/mu')[:, np.newaxis, :]
        sigma2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/sigma')[:, np.newaxis, :]
        Tslab2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Tslab')[:, np.newaxis, :]
        Tlla2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Tlla')[:, np.newaxis, :]
        T2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/T')[:, np.newaxis, :]
        Q2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Q')[:, np.newaxis, :]
        Zflla2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Zflla')
        Zflla2 = np.repeat(Zflla2, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        Zs2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Zs')
        Zs2 = np.repeat(Zs2, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        delta2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/delta')
        delta2 = np.repeat(delta2, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        Zsl2 = np.loadtxt('prints/old_results_T/perf-' + str(n) + '/Zsl')
        Zsl2 = np.repeat(Zsl2, 184, axis=0).reshape(101, 184)[:, np.newaxis, :]
        Z = np.append(Z, Z2, axis=1)
        Qi = np.append(Qi, Qi2, axis=1)
        S = np.append(S, S2, axis=1)
        Tsl = np.append(Tsl, Tsl2, axis=1)
        sigma_max = np.append(sigma_max, sigma_max2, axis=1)
        mu = np.append(mu, mu2, axis=1)
        sigma = np.append(sigma, sigma2, axis=1)
        Tslab = np.append(Tslab, Tslab2, axis=1)
        Tlla = np.append(Tlla, Tlla2, axis=1)
        T = np.append(T, T2, axis=1)
        Q = np.append(Q, Q2, axis=1)
        Zflla = np.append(Zflla, Zflla2, axis=1)
        Zs2 = np.append(Zs, Zs2, axis=1)
        delta = np.append(delta, delta2, axis=1)
        Zsl = np.append(Zsl, Zsl2, axis=1)
pass