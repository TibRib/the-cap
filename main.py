from datetime import date
from ranking import tools

path = 'ranking/Rankings.csv'
all_ath = tools.useCSV('ranking/Rankings.csv')

tools.updateCSV(path, all_ath)

B = tools.initAthleteFromCSV(path, 'Dominic_Thiem')