'''TODO:
add to functions, 
'''
import pandas as pd
import math
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import chi2_contingency
sns.set_style("darkgrid")

df=pd.read_csv("/Users/dominikbujna/Documents/Projet/the-cap/machine_learning/csv/ATP.csv",low_memory=False)
cols = ['best_of', 'draw_size', 'l_1stIn', 'l_1stWon', 'l_2ndWon', 'l_SvGms', 'l_ace', 'l_bpFaced', 'l_bpSaved', 'l_df', 'l_svpt', 'loser_age', 'loser_entry', 'loser_hand', 'loser_ht', 'loser_ioc', 'loser_rank', 'loser_rank_points', 'loser_seed', 'match_num', 'minutes', 'round', 'score', 'tourney_date', 'tourney_id', 'tourney_level', 'tourney_name', 'w_1stIn', 'w_1stWon', 'w_2ndWon', 'w_SvGms', 'w_ace', 'w_bpFaced', 'w_bpSaved', 'w_df', 'w_svpt', 'winner_age', 'winner_entry', 'winner_hand', 'winner_ht', 'winner_ioc', 'winner_rank', 'winner_rank_points', 'winner_seed']
df = df.drop(columns=cols)
# print(df)
# print("Total number of matches : "+str(len(data)))

# print(list(data.columns))
player_name = 'Dusan Lajovic'
wins = df[df["winner_name"] == player_name]

# print(fed.to_markdown())

surf = pd.DataFrame(wins.groupby(['surface']).count())

loses = df[df["loser_name"]==player_name]
l = pd.DataFrame(loses.groupby(['surface']).count())

# print(surf.to_markdown())
# print(l.to_markdown())
# table = pd.pivot_table(df, values='', index=['A', 'B'],
#                     columns=['C'], aggfunc=np.sum)


tabl = pd.DataFrame([[57, 4, 40], [59, 10, 59]])
tabl.columns = ["Clay", "Hard", "Grass"]
tabl.index = ["Wins", "Losses"]
print(tabl.to_markdown())


# print(tabl.sum(axis=0)['Clay'])
# print(tabl.sum(axis=1)['Wins'])

k = 0
n = tabl.sum().sum()
print(n)
for row in tabl.index.values:
    for col in tabl.columns.values:
        nij = tabl[col][row]
        ni = tabl.sum(axis=0)[col]
        nj = tabl.sum(axis=1)[row]
        xp = (ni * nj) / n
        k += ((nij - xp)**2)/xp
        
        print(tabl[col][row])
print(f'K = {k}')

#if p < 5 => surface matters
c, p, dof, expected = chi2_contingency(tabl)
v = math.sqrt(c/(n*((2)-1)))
print(p)
print(c)
print(dof)
print(expected)
print(v)