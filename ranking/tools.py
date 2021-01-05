import csv
from Athlete import *


def useCSV(path):
    all = []
    # open file in read mode
    with open('/home/azarog/Documents/the-cap/ranking/Rankings.csv', 'r') as read_obj:
        # pass the file object to reader() to get the reader object
        csv_reader = csv.reader(read_obj)
        # Iterate over each row in the csv using reader object
        for row in csv_reader:
            # row variable is a list that represents a row in csv
            all.append(Athlete(name=row[1], sport='Tennis', rank=row[4]))
    return all
