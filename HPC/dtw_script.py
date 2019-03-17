import pandas as pd
import numpy as np
from dtaidistance import dtw

data = pd.read_csv('./data/sampled_data.csv',header=0)

series_subset = []
for i in data.index:
    val = map(int,data.loc[i,'values'].split("_"))
    series_subset.append(np.array(list(val), dtype=np.double))

ds_subset = dtw.distance_matrix_fast(series_subset, show_progress=False, parallel=True)

ds_subset[np.tril_indices(ds_subset.shape[0],k=-1)] = ds_subset.T[np.tril_indices(ds_subset.shape[0],k=-1)]
np.fill_diagonal(ds_subset,0)

ds_subset = pd.DataFrame(ds_subset)
ds_subset.columns = data.index
ds_subset['index'] = data.index
ds_subset = ds_subset.set_index('index')

ds_subset.to_csv('output.csv', header=False, index=False)
