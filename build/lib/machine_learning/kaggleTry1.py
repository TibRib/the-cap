def trainSave():
    #import kaggle
    import os
    import pandas as pd, numpy as np
    from datetime import datetime
    import time
    from sklearn.preprocessing import LabelEncoder

    df = pd.read_csv('machine_learning\csv\ATP.csv', low_memory=False)
    #print(df.shape)
    #df.head()
    #df.info()



    # these variables do not seem relevant to me. might be assessed in a further work
    df = df.drop(columns=['tourney_id','tourney_name','tourney_date','match_num','winner_entry','loser_entry','winner_name','score','loser_name',
                            'winner_seed','draw_size','winner_ht','winner_rank_points',
                            'loser_seed','loser_ht','loser_rank_points','best_of','minutes',
                            'w_ace','w_df','w_svpt','w_1stIn','w_1stWon','w_2ndWon','w_SvGms','w_bpSaved','w_bpFaced',
                            'l_ace','l_df','l_svpt','l_1stIn','l_1stWon','l_2ndWon','l_SvGms','l_bpSaved','l_bpFaced',
                            'winner_id',
                            'loser_id',
                            'tourney_level',
                            'round',
                            'winner_ioc',
                            'loser_ioc'])

    # winner_hand, loser_hand

    # convert numeric varibales to the correct type (csv_read fct does not make auto convert)
    col_names_to_convert = ['winner_rank', 'winner_hand', 'winner_age',
                            'loser_rank','loser_hand', 'loser_age',
                            'surface']




    '''
                            ,'winner_seed','draw_size','winner_ht','winner_age','winner_rank','winner_rank_points',
                            'loser_seed','loser_ht','loser_age','loser_rank','loser_rank_points','best_of','minutes',
                            'w_ace','w_df','w_svpt','w_1stIn','w_1stWon','w_2ndWon','w_SvGms','w_bpSaved','w_bpFaced',
                            'l_ace','l_df','l_svpt','l_1stIn','l_1stWon','l_2ndWon','l_SvGms','l_bpSaved','l_bpFaced'
                        ]
    '''

    for col_name in col_names_to_convert:
        df[col_name] = pd.to_numeric(df[col_name], errors='coerce')

    df.describe().transpose()


    # append a new target variable with the code assigned to winner player (0 when P1 | 1 when P2)
    # For this set of data, the winner is always P1, so append 0s to the target variable
    df['target'] = np.zeros(df.shape[0], dtype = int)

    # Now we'll generate the second batch of data, ie, by switching P1 and P2. The winner this time will be P2, and the target variable =1
    # generate data by switching among P1 and P2 (target will be P2)
    df2 = df.copy()
    # switch between variables from P1 and those from P2
    #df2[['winner_id', 'winner_seed','winner_hand','winner_ht','winner_ioc','winner_age','winner_rank','winner_rank_points']] = df[['loser_id', 'loser_seed','loser_hand','loser_ht','loser_ioc','loser_age','loser_rank','loser_rank_points']]
    #df2[['loser_id', 'loser_seed','loser_hand','loser_ht','loser_ioc','loser_age','loser_rank','loser_rank_points']] = df[['winner_id', 'winner_seed','winner_hand','winner_ht','winner_ioc','winner_age','winner_rank','winner_rank_points']]
    #df2[['w_ace','w_df','w_svpt','w_1stIn','w_1stWon','w_2ndWon','w_SvGms','w_bpSaved','w_bpFaced']] = df[['l_ace','l_df','l_svpt','l_1stIn','l_1stWon','l_2ndWon','l_SvGms','l_bpSaved','l_bpFaced']]
    #df2[['l_ace','l_df','l_svpt','l_1stIn','l_1stWon','l_2ndWon','l_SvGms','l_bpSaved','l_bpFaced']] = df[['w_ace','w_df','w_svpt','w_1stIn','w_1stWon','w_2ndWon','w_SvGms','w_bpSaved','w_bpFaced']]
    df2[['winner_rank', 'winner_hand', 'winner_age']] = df[['loser_rank', 'loser_hand', 'loser_age']]
    df2[['loser_rank', 'loser_hand', 'loser_age']] = df[['winner_rank', 'winner_hand', 'winner_age']]


    df2['target'] = np.ones(df2.shape[0], dtype = int)

    df = df.append(df2)

    #print(df.head(2).append(df.tail(2)))

    lb = LabelEncoder()
    df['winner_hand'] = lb.fit_transform(df['winner_hand'].astype(str))
    df['loser_hand'] = lb.fit_transform(df['loser_hand'].astype(str))
    df['winner_rank'] = lb.fit_transform(df['winner_rank'].astype(float))
    df['loser_rank'] = lb.fit_transform(df['loser_rank'].astype(float))
    df['winner_age'] = lb.fit_transform(df['winner_age'].astype(float))
    df['loser_age'] = lb.fit_transform(df['loser_age'].astype(float))
    df['surface'] = lb.fit_transform(df['surface'].astype(str))
    '''
    df['tourney_level'] = lb.fit_transform(df['tourney_level'].astype(str))
    df['round'] = lb.fit_transform(df['round'].astype(str))
    df['winner_ioc'] = lb.fit_transform(df['winner_ioc'].astype(str))
    df['loser_ioc'] = lb.fit_transform(df['loser_ioc'].astype(str))
    '''

    # replace nan with 0 and infinity with large values
    df = df.fillna(df.median())

    #
    #   Prediction
    #

    # subsample for test purpose : TODO: REMOVE FOR FINAL RUN
    df = df.sample(100000)

    # split train/test subsets (80% train, 20% test)
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(df.iloc[:, :-1], df.target, random_state=0)

    # import classifiers from sklearn
    from sklearn.neural_network import MLPClassifier
    from sklearn.neighbors import KNeighborsClassifier
    from sklearn.svm import SVC
    from sklearn.gaussian_process import GaussianProcessClassifier
    from sklearn.gaussian_process.kernels import RBF
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
    from sklearn.naive_bayes import GaussianNB
    from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
    from sklearn.linear_model import RidgeClassifier
    from sklearn.linear_model import PassiveAggressiveClassifier

    # set names and prepare the benchmark list
    names = ["K Near. Neighb.", "Decision Tree", "Random Forest", "Naive Bayes", # "Quad. Dis. Ana.",
    "AdaBoost", 
            "Neural Net" , #"RBF SVM","Linear SVM", 
            "Ridge Class.", "Passive Aggre."
            ]

    classifiers = [
        KNeighborsClassifier(10),
        DecisionTreeClassifier(max_depth=5),
        RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
        GaussianNB(),
        #QuadraticDiscriminantAnalysis(),
        AdaBoostClassifier(),
        MLPClassifier(alpha=1, max_iter=1000),
        # too long run for the test
        #SVC(gamma=2, C=1),
        #SVC(kernel="linear", C=.025),
        RidgeClassifier(tol=.01, solver="lsqr"),
        PassiveAggressiveClassifier()
    ]



    # init time 
    tim = time.time()
    #print('Learn. model\t\t score\t\t\ttime\t\tratio')
    print('Learn. model\t\t time')
    scores = []
    ratios = []

    import pickle
    from joblib import dump, load
    from pathlib import Path
    data_folder_pkl = Path("machine_learning/models/pickle/")
    data_folder_jl = Path("machine_learning/models/joblib/")


    for name, clf in zip(names, classifiers):
            print(name, end='')
            clf.fit(X_train, y_train)
            #score = clf.score(X_test, y_test)

            #saving model
            nameFile = name
            nameFile = nameFile.replace(' ', '_').replace('.', '')
            nameFile_pkl = nameFile + '.pkl'
            nameFile_jl = nameFile + '.joblib'
            filename_pkl = data_folder_pkl / nameFile_pkl
            filename_jl = data_folder_jl / nameFile_jl
            
            pickle.dump(clf, open(filename_pkl, 'wb'))
            dump(clf, filename_jl)

            '''
            print('\t\t', round(score * 100 , 3) , '%', '\t\t', round(time.time() - tim, 2), '\t\t', round(score * 2 / (time.time() - tim), 3))
            ratios.append( round(score * 100 , 3) / round(time.time() - tim, 3))
            scores.append(score)
            '''
            print('\t\t[', round(time.time() - tim, 2), ']')
            tim = time.time()

    '''
    # plot results
    import matplotlib.pyplot as plt

    plt.rcdefaults()

    y_pos = np.arange(len(names))

    plt.bar(y_pos, scores, align='center', alpha=0.5)
    plt.xticks(y_pos, names, rotation='vertical')
    plt.ylabel('Accuracy')
    plt.title('Model comparison for ATP prediction')

    plt.show()
    '''












#
# TODO delete
#

import pickle
import time
import joblib
from pathlib import Path

from numpy import median

def loadModelList():
    data_folder_pickle = Path("machine_learning/models/pickle/")

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
    df = df.drop(columns=['tourney_id','tourney_name','tourney_date','match_num','winner_entry','loser_entry','winner_name','score','loser_name',
                            'winner_seed','draw_size','winner_ht','winner_rank_points',
                            'loser_seed','loser_ht','loser_rank_points','best_of','minutes',
                            'w_ace','w_df','w_svpt','w_1stIn','w_1stWon','w_2ndWon','w_SvGms','w_bpSaved','w_bpFaced',
                            'l_ace','l_df','l_svpt','l_1stIn','l_1stWon','l_2ndWon','l_SvGms','l_bpSaved','l_bpFaced',
                            'winner_id',
                            'loser_id',
                            'tourney_level',
                            'round',
                            'winner_ioc',
                            'loser_ioc'])

    # winner_hand, loser_hand

    # convert numeric varibales to the correct type (csv_read fct does not make auto convert)
    col_names_to_convert = ['winner_rank', 'winner_hand', 'winner_age',
                            'loser_rank','loser_hand', 'loser_age',
                            'surface']


   
    for col_name in col_names_to_convert:
        df[col_name] = pd.to_numeric(df[col_name], errors='coerce')

    df.describe().transpose()

    lb = LabelEncoder()
    '''
    df['surface'] = lb.fit_transform(df['surface'].astype(str))
    df['tourney_level'] = lb.fit_transform(df['tourney_level'].astype(str))
    df['winner_hand'] = lb.fit_transform(df['winner_hand'].astype(str))
    df['loser_hand'] = lb.fit_transform(df['loser_hand'].astype(str))
    df['round'] = lb.fit_transform(df['round'].astype(str))
    df['winner_ioc'] = lb.fit_transform(df['winner_ioc'].astype(str))
    df['loser_ioc'] = lb.fit_transform(df['loser_ioc'].astype(str))
    '''
    # replace nan with 0 and infinity with large values
    #df = df.fillna(df.median())
    df = pd.DataFrame(df).fillna(0)

    models_list.pop(2)
    return models_list, df, model_files

def printToFile(resultTxt, models_list, df, model_files):
    totalResult = []
    for model in models_list:
        totalResult.append(model.predict(df))
        print('finished', model)

    cptModel = 0
    text_file = open(resultTxt, "w")
    text_file.write('{}\n'.format(list(df.columns.values)))
    list_of_percent = []
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
        #text_file.write('[%s' % format(round(goodPred / (goodPred + badPred) * 100, 3)) + ' ]' % model_files[cptModel])
        perc = round(goodPred / (goodPred + badPred) * 100, 3)
        list_of_percent.append(perc)
        print('[' + str(perc).zfill(6) + ' %]', model_files[cptModel])
        text_file.write('[{} %] - {}\n'.format(str(perc).zfill(6), model_files[cptModel][:-4]))
        cptModel += 1
    return list_of_percent


#
#
#








list_of_accuracies = []
model_comparison = [[], [], [], [], [], [], []]

tim = time.time()

for i in range(10):
    trainSave()
    models, df, model_files = loadModelList()
    list_of_accuracies.append(printToFile('temp.txt', models, df, model_files))

flat_list = [item for sublist in list_of_accuracies for item in sublist]

cpt = 0
for val in flat_list:
    model_comparison[cpt%7].append(val)
    cpt += 1


import statistics

final_res = []

cpt = 0
for model in model_comparison:
    M = max(model)
    m = min(model)
    moy = statistics.mean(model)
    final_res.append({"name": model_files[cpt][:-4], "Max": round(M, 1), "min": round(m, 1), "mean": round(moy, 1)})
    cpt += 1


print('\n[', int(len(flat_list) / 7), 'iterations ]','\nName', '\t\t\t', 'min/Max', '\t\t', 'Mean')
for item in final_res:
    print(item['name'], '\t\t', item['min'], '/', item['Max'], '\t\t', item['mean'])

print('\n')
print(round(time.time() - tim, 2), 'sec\n\n')
