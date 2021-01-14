import sqlite3
import json


def JSONify(row):
    """
    JSONify the data fetched from SQLite.

    Arguments:

        row {SQlite row} -- Data fetched.

    Returns:

        JSON -- The JSON object of the data.
    """
    obj_json = {
        "id": row[0],
        "start_date": row[1],
        "end_date": row[2],
        "location": row[3],
        "court_surface": row[4],
        "prize_money": row[5],
        "currency": row[6],
        "year": row[7],
        "player_id": row[8],
        "player_name": row[9],
        "opponent_id": row[10],
        "opponent_name": row[11],
        "tournament": row[12],
        "round": row[13],
        "num_sets": row[14],
        "sets_won": row[15],
        "games_won": row[16],
        "games_against": row[17],
        "tiebreaks_won": row[18],
        "tiebreaks_total": row[19],
        "serve_rating": row[20],
        "aces": row[21],
        "double_faults": row[22],
        "first_serve_made": row[23],
        "first_serve_attempted": row[24],
        "first_serve_points_made": row[25],
        "first_serve_points_attempted": row[26],
        "second_serve_points_made": row[27],
        "second_serve_points_attempted": row[28],
        "break_points_saved": row[29],
        "break_points_against": row[30],
        "service_games_won": row[31],
        "return_rating": row[32],
        "first_serve_return_points_made": row[33],
        "first_serve_return_points_attempted": row[34],
        "second_serve_return_points_made": row[35],
        "second_serve_return_points_attempted": row[36],
        "break_points_made": row[37],
        "break_points_attempted": row[38],
        "return_games_played": row[39],
        "service_points_won": row[40],
        "service_points_attempted": row[41],
        "return_points_won": row[42],
        "return_points_attempted": row[43],
        "total_points_won": row[44],
        "total_points": row[45],
        "duration": row[46],
        "player_victory": row[47],
        "retirement": row[48],
        "seed": row[49],
        "won_first_set": row[50],
        "doubles": row[51],
        "masters": row[52],
        "round_num": row[53],
        "nation": row[54]
    }

    return obj_json


def getAllMatchesFromAthlete(athlete_name, limit=10000000):
    """Get all the matches of a given athlete.

    Arguments:
        athlete_name {str} -- The athlete name for who we want the matches.

    Keyword Arguments:
        limit {int} -- Maximum to return to ease usage (default: {10 000 000})

    Returns:
        tuples -- all the rows returned from SQlite
    """
    conn = sqlite3.connect('sql/tennisReal.db')
    curs = conn.cursor()
    query = "SELECT * FROM matches WHERE player_id LIKE '%" + \
        str(athlete_name) + "%' LIMIT " + str(limit) + ";"
    curs.execute(query)
    rows = curs.fetchall()

    conn.commit()
    conn.close()
    return rows

def getAllMatchesFromStartDate(year='0', month=0, day=0, limit=10000000):
    """Get all matches for a given start_date.

    Keyword Arguments:
        year {str} -- number of on classical numerical format (default: {'2000'})
        month {str} -- number of on classical numerical format (default: {'1'})
        day {str} -- number of on classical numerical format (default: {'1'})
        limit {int} -- Maximum to return to ease usage (default: {10 000 000})

    Returns:
        [type] -- [description]
    """
    date = str(year) + '-' + "{:02d}".format(month) + \
        '-' + "{:02d}".format(day)
    conn = sqlite3.connect('sql/tennisReal.db')
    curs = conn.cursor()


    if limit == None:
        limit = 1000000

    if year == '0' and month == 0 and day == 0:
        query = ""
    #if we have only a year
    elif year != '0' and month == 0 and day == 0:
        query = "SELECT * FROM matches WHERE start_date LIKE '" + str(year) + "%' LIMIT " + str(limit) + ";"
    #if we have only a month
    elif year == '0' and month != 0 and day == 0:
        query = "SELECT * FROM matches WHERE start_date LIKE '%" + "{:02d}".format(month) + "%' LIMIT " + str(limit) + ";"
    #if we have only a day
    elif year == '0' and month == 0 and day != 0:
        query = "SELECT * FROM matches WHERE start_date LIKE '%" + "{:02d}".format(day) + "' LIMIT " + str(limit) + ";"
    #if we miss only the year
    elif year == '0' and month != 0 and day != 0:
        query = "SELECT * FROM matches WHERE start_date LIKE '%" + "{:02d}-{:02d}".format(month, day) + "' LIMIT " + str(limit) + ";"
    #if we miss only the month
    elif year != '0' and month == 0 and day != 0:
        query = "SELECT * FROM matches WHERE start_date LIKE '%" + str(year) + "-%-{:02d}".format(day) + "' LIMIT " + str(limit) + ";"
    #if we miss only the day
    elif year != '0' and month != 0 and day == 0:
        query = "SELECT * FROM matches WHERE start_date LIKE '%" + str(year) + "-{:02d}".format(month) + "-%' LIMIT " + str(limit) + ";"
    else:
        query = "SELECT * FROM matches WHERE start_date LIKE '" + str(date) + "' LIMIT " + str(limit) + ";"

    curs.execute(query)
    rows = curs.fetchall()

    conn.commit()
    conn.close()

    return rows

def getQuery(query='', limit=1000000):
    """
    docstring
    """
    conn = sqlite3.connect('sql/tennisReal.db')
    curs = conn.cursor()


    if limit == None:
        limit = 1000000
    
    query = query

    curs.execute(query)
    rows = curs.fetchall()

    conn.commit()
    conn.close()

    return rows
#rows = getAllMatchesFromAthlete(str('novac'), limit=10)
# print(JSONify(rows[0]))
