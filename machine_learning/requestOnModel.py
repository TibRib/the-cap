import pickle
import joblib
from pathlib import Path

data_folder_pickle = Path("machine_learning/models/pickle/")
neural = data_folder_pickle / "Neural_Net.pkl"
naive = data_folder_pickle / "Naive_Bayes.pkl"
ada = data_folder_pickle / "Neural_Net.pkl"

from os import listdir
from os.path import isfile, join
model_files = [f for f in listdir(data_folder_pickle) if isfile(join(data_folder_pickle, f))]

models_list = []

# creating a list of saved models
for model in model_files:
    fileName = data_folder_pickle / model
    with open(fileName, 'rb') as fid:
        models_list.append(pickle.load(fid))

import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder


df = pd.read_csv(r'machine_learning\csv\ATP.csv', low_memory=False)
resultDf = pd.read_csv(r'machine_learning\csv\ATP.csv', low_memory=False)


# these variables do not seem relevant to me. might be assessed in a further work
df = df.drop(columns=['tourney_id','tourney_name','tourney_date','match_num','winner_entry','loser_entry','winner_name','score','loser_name'])

# convert numeric varibales to the correct type (csv_read fct does not make auto convert)
col_names_to_convert = ['winner_seed','draw_size','winner_ht','winner_age','winner_rank','winner_rank_points',
                       'loser_seed','loser_ht','loser_age','loser_rank','loser_rank_points','best_of','minutes',
                       'w_ace','w_df','w_svpt','w_1stIn','w_1stWon','w_2ndWon','w_SvGms','w_bpSaved','w_bpFaced',
                       'l_ace','l_df','l_svpt','l_1stIn','l_1stWon','l_2ndWon','l_SvGms','l_bpSaved','l_bpFaced'
                       ]
for col_name in col_names_to_convert:
    df[col_name] = pd.to_numeric(df[col_name], errors='coerce')

df.describe().transpose()

lb = LabelEncoder()
df['surface'] = lb.fit_transform(df['surface'].astype(str))
df['tourney_level'] = lb.fit_transform(df['tourney_level'].astype(str))
df['winner_hand'] = lb.fit_transform(df['winner_hand'].astype(str))
df['loser_hand'] = lb.fit_transform(df['loser_hand'].astype(str))
df['round'] = lb.fit_transform(df['round'].astype(str))
df['winner_ioc'] = lb.fit_transform(df['winner_ioc'].astype(str))
df['loser_ioc'] = lb.fit_transform(df['loser_ioc'].astype(str))

# replace nan with 0 and infinity with large values
#df = df.fillna(df.median())
df = pd.DataFrame(df).fillna(0)

models_list.pop(2)

totalResult = []
for model in models_list:
    totalResult.append(model.predict(df))
    print('finished', model)

cptModel = 0
for modelRes in totalResult:
    cpt = goodPred = badPred = 0
    for r in modelRes:
        # predicted winner is really winner
        if r == 0:
            # print('[V] - winner = ', resultDf['winner_name'][cpt])
            goodPred += 1
        # predicted winner is the loser
        else :
            # print('[X] - winner = ', resultDf['loser_name'][cpt])
            badPred += 1
        cpt += 1
    print('[' + format(round(goodPred / (goodPred + badPred) * 100, 3)) + ' %]', model_files[cptModel])
    cptModel += 1