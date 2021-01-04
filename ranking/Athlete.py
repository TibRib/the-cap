import json

class Athlete:
    def __init__(self, name='athlete_name', sport='athlete_sport', birth_year=1970, rank=1500, win=10, loss=20):
        self.name = name
        self.sport = sport
        self.birth_year = birth_year
        self.rank = rank
        self.win = win
        self.loss = loss

    def exportJSON(self):
        return '{"athlete": { \
                    "name": "' + self.name + '", \
                    "sport": "' + self.sport + '", \
                    "birth_year": ' + str(self.birth_year) + ', \
                    "rank": ' + str(self.rank) + ', \
                    "win": ' + str(self.win) + ', \
                    "loss": ' + str(self.loss) + ' } \
                }'