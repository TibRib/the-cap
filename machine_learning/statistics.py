import pandas as pd
import math
import numpy as np
from scipy.stats import chi2_contingency

df=pd.read_csv("/Users/dominikbujna/Documents/Projet/the-cap/machine_learning/csv/ATP.csv",low_memory=False)
# cols = ['best_of', 'draw_size', 'l_1stIn', 'l_1stWon', 'l_2ndWon', 'l_SvGms', 'l_ace', 'l_bpFaced', 'l_bpSaved', 'l_df', 'l_svpt', 'loser_age', 'loser_entry', 'loser_hand', 'loser_ht', 'loser_ioc', 'loser_rank', 'loser_rank_points', 'loser_seed', 'match_num', 'minutes', 'round', 'score', 'tourney_date', 'tourney_id', 'tourney_level', 'tourney_name', 'w_1stIn', 'w_1stWon', 'w_2ndWon', 'w_SvGms', 'w_ace', 'w_bpFaced', 'w_bpSaved', 'w_df', 'w_svpt', 'winner_age', 'winner_entry', 'winner_hand', 'winner_ht', 'winner_ioc', 'winner_rank', 'winner_rank_points', 'winner_seed']
# df = df.drop(columns=cols)

def get_contingency_table(player_name : str, column : str):
    '''
    creates a table of wins/loses grouped by column values
    '''
    #get all rows of the table and count them by groups in column
    games_won = df[df["winner_name"] == player_name]
    wins = pd.DataFrame(games_won.groupby([column]).count())

    games_lost = df[df["loser_name"]==player_name]
    losses = pd.DataFrame(games_lost.groupby([column]).count())
    #reformat into a table
    table = pd.DataFrame((wins['winner_name'], losses['loser_name']))
    table.index = ["Won", "Lost"]
    table.rename_axis("result", axis=0)
    table.rename_axis("surface", axis=1)
    return table

def manual_k(tabl):
    '''
    Calculates the same K value as the following function (c output of chi2_contingency), just manually according to the formula.
    '''
    k = 0
    #get sum of all observations
    n = tabl.sum().sum()
    for row in tabl.index.values:
        for col in tabl.columns.values:
            #value in the cell
            nij = tabl[col][row]
            #sum of row and sum of column
            ni = tabl.sum(axis=0)[col]
            nj = tabl.sum(axis=1)[row]
            #expected value in cell based on percentage of row and column
            expected_cell = (ni * nj) / n
            #sum of percentages of square differences of expected and observed values
            k += ((nij - expected_cell)**2)/expected_cell
    print(f'K = {k}')
    return k

def is_significant(table):
    '''
    Takes contingency table, calculates p-value, according to which decides if the difference is significant,
    then uses K to get Cramer's V correlation coefficient
    '''
    if table.empty:
        return False, 0, 0
    n = table.sum().sum()
    K, p, dof, expected = chi2_contingency(table)
    #if p < 0.05 => surface really matters
    significant = p < 0.05
    #get Kramer V statistics, correlation: -1 = neg, 0 = no, 1 = pos
    v = math.sqrt(K/(n*((2)-1)))
    return significant, v, p

def surface_dependent_players(n = 8000000000):
    '''
    gets a list of players who have are affected by surface they play on with 95% confidence, 
    parameter to limit the number of players checked as it is not really fast
    '''
    affected = dict()
    #get set of all players
    winners = df.winner_name.unique()
    losers = df.loser_name.unique()
    players = {x for x in winners}
    for x in losers:
        players.add(x)
    i = 0
    for player in players:
        if i < n:
            t = get_contingency_table(player, "surface")
            sig = is_significant(t)
            if sig[0]:
                affected[player] = (t, sig)
        i+=1
    return affected

sdp = surface_dependent_players(100)

for p in sdp:
    print(p)
    print(sdp[p][0])
    print(sdp[p][1])
    print("\n")
