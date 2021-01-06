from datetime import date
from ranking import tools

path = '/home/azarog/Documents/the-cap/ranking/Rankings.csv'
all_ath = tools.useCSV('/home/azarog/Documents/the-cap/ranking/Rankings.csv')

print(all_ath[0].rank, all_ath[0].name)

tools.updateCSV('/home/azarog/Documents/the-cap/ranking/Rankings.csv', all_ath)

tools.fromCSVtoJSON(path)
