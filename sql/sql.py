import sqlite3

conn = sqlite3.connect('tennis.db')
curs = conn.cursor()

#curs.execute('create table matches (start_date,end_date,location,court_surface,prize_money,currency,year,player_id,player_name,opponent_id,opponent_name,tournament,round,num_sets,sets_won,games_won,games_against,tiebreaks_won,tiebreaks_total,serve_rating,aces,double_faults,first_serve_made,first_serve_attempted,first_serve_points_made,first_serve_points_attempted,second_serve_points_made,second_serve_points_attempted,break_points_saved,break_points_against,service_games_won,return_rating,first_serve_return_points_made,first_serve_return_points_attempted,second_serve_return_points_made,second_serve_return_points_attempted,break_points_made,break_points_attempted,return_games_played,service_points_won,service_points_attempted,return_points_won,return_points_attempted,total_points_won,total_points,duration,player_victory,retirement,seed,won_first_set,doubles,masters,round_num,nation)')
curs.execute(
    "SELECT duration, player_id, opponent_id, start_date FROM matches WHERE player_id like '%novak_djo%';")
'''
curs.execute("insert into employee values ('Ali', 28)")
values = [('Brad',54), ('Ross', 34), ('Muhammad', 28), ('Bilal', 44)]
curs.executemany('insert into employee values(?,?)', values)
'''

rows = curs.fetchall()

for row in rows:
    print(row)

conn.commit()
conn.close()


def getAllMatchesFromAthlete(athlete_name):
    """
    docstring
    """
    conn = sqlite3.connect('tennis.db')
    curs = conn.cursor()

    #curs.execute('create table matches (start_date,end_date,location,court_surface,prize_money,currency,year,player_id,player_name,opponent_id,opponent_name,tournament,round,num_sets,sets_won,games_won,games_against,tiebreaks_won,tiebreaks_total,serve_rating,aces,double_faults,first_serve_made,first_serve_attempted,first_serve_points_made,first_serve_points_attempted,second_serve_points_made,second_serve_points_attempted,break_points_saved,break_points_against,service_games_won,return_rating,first_serve_return_points_made,first_serve_return_points_attempted,second_serve_return_points_made,second_serve_return_points_attempted,break_points_made,break_points_attempted,return_games_played,service_points_won,service_points_attempted,return_points_won,return_points_attempted,total_points_won,total_points,duration,player_victory,retirement,seed,won_first_set,doubles,masters,round_num,nation)')
    curs.execute(
        "SELECT duration, player_id, opponent_id, start_date FROM matches WHERE player_id like '%novak_djo%';")
    '''
    curs.execute("insert into employee values ('Ali', 28)")
    values = [('Brad',54), ('Ross', 34), ('Muhammad', 28), ('Bilal', 44)]
    curs.executemany('insert into employee values(?,?)', values)
    '''

    rows = curs.fetchall()

    for row in rows:
        print(row)

conn.commit()
conn.close()
