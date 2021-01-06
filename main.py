from datetime import date
from ranking import tools

all_ath = tools.useCSV('/home/azarog/Documents/the-cap/ranking_module/Rankings.csv')

print(all_ath[0].rank, all_ath[0].name)

tools.updateCSV('/home/azarog/Documents/the-cap/ranking_module/Rankings.csv', all_ath)