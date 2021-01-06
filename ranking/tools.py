import csv, shutil
from ranking import athlete
from ranking.athlete import Athlete
from tempfile import NamedTemporaryFile
from datetime import date, time, datetime
from ranking import *


def useCSV(path):
    all = []
    # open file in read mode
    with open('/home/azarog/Documents/the-cap/ranking/Rankings.csv', 'r') as read_obj:
        # pass the file object to reader() to get the reader object
        csv_reader = csv.reader(read_obj)
        # Iterate over each row in the csv using reader object
        i = 0
        for row in csv_reader:
            # row variable is a list that represents a row in csv
            if i != 0:
                all.append(Athlete(name=row[1], sport='Tennis', rank=int(row[4])))
            i+=1
    return all

def updateCSV(path, athlete_list):
    filename = path
    tempfile = NamedTemporaryFile(mode='w', delete=False)

    fields = ['rank', 'name','country_name','country_id','points','bestRank','bestRankDate','rankDiff','pointsDiff','bestPoints', 'bestPointsDate']

    with open(filename, 'r') as csvfile, tempfile:
        i=0
        reader = csv.DictReader(csvfile, fieldnames=fields)
        writer = csv.DictWriter(tempfile, fieldnames=fields)
        for row in reader:
            for athlete in athlete_list:
                if i != 0:
                    old_points = int(row['points'])
                    bestPointsDate = '1970-01-01'
                    if row['name'] == athlete.name:
                        row['points'] = athlete.rank
                    #update best points
                    if int(row['points']) > int(row['bestPoints']):
                        row['bestPoints'] = row['points']
                        row['pointsDiff'] = int(athlete.rank) - old_points
                        row['bestPointsDate'] = date.today()

            row = {'rank':row['rank'], 'name': row['name'].replace(' ', '_'), 'country_name': row['country_name'].replace(' ', '_'),'country_id': row['country_id'],'points': row['points'],'bestRank': row['bestRank'],'bestRankDate': row['bestRankDate'],'rankDiff': row['rankDiff'],'pointsDiff': row['pointsDiff'],'bestPoints': row['bestPoints'], 'bestPointsDate': row['bestPointsDate']}
            writer.writerow(row)
            i+=1

    shutil.move(tempfile.name, filename)

def fromCSVtoJSON(path):
    """
    Return a dict to be used in flask, of the rankings.
    """
    array = []
    with open(path, mode='r') as infile:
        reader = csv.reader(infile)
        for row in reader:
            player = {'rank':row[0], 'name':row[1], 'country_name':row[2], 'country_id':row[3], 'points':row[4], 'bestRank':row[5], 'bestRankDate':row[6], 'rankDiff':row[7], 'pointsDiff':row[8], 'bestPoints':row[9], 'bestPointsDate':row[10]}
            array.append(player)
    return array 


def initAthleteFromCSV(path, ath_name):
    """
    Need to be replaced with DB.
    """
    with open(path, mode='r') as infile:
        reader = csv.reader(infile)
        for row in reader:
            if row[1] == ath_name:
                print(row[4])
                return athlete.Athlete(name=ath_name, rank=row[4])
                
    return athlete.Athlete()