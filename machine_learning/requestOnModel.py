import pickle
import joblib
from pathlib import Path

data_folder_pickle = Path("machine_learning/models/pickle/")
pkl_filename = data_folder_pickle / "Neural_Net.sav"

with open(pkl_filename, 'rb') as fid:
    pkl_model = pickle.load(fid)


data_folder_joblib = Path("machine_learning/models/joblib/")
joblib_filename = data_folder_joblib / "Neural_Net.joblib"
joblib_model = joblib.load(joblib_filename)
print(pkl_model)
print(joblib_model)