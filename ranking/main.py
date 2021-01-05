from datetime import date
from Athlete import *
from tools import *

all_ath = useCSV('/home/azarog/Documents/the-cap/ranking/Rankings.csv')

print(all_ath[0].rank, all_ath[0].name)

updateCSV('/home/azarog/Documents/the-cap/ranking/Rankings.csv', all_ath)