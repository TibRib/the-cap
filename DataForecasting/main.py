from datetime import date
from ranking import tools

path = '/home/azarog/Documents/the-cap/ranking/Rankings.csv'
all_ath = tools.useCSV('/home/azarog/Documents/the-cap/ranking/Rankings.csv')

tools.updateCSV('/home/azarog/Documents/the-cap/ranking/Rankings.csv', all_ath)

B = tools.initAthleteFromCSV(path, 'Dominic_Thiem')