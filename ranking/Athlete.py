import json

class Athlete:
    def __init__(self, name='athlete_name', sport='athlete_sport', birth_year=1970, rank=1500, win=[1000], loss=[2000], draw=[1500]):
        '''
        Parameters:
            - win, loss and draw are juste the ranking of opponent.
        '''
        self.name = name
        self.sport = sport
        self.birth_year = birth_year
        self.win = win
        self.loss = loss
        self.draw = draw
        self.rank = self.calculateRank()

    def loose(self, opponent):
        '''
        When a player looses the ranking falls.

        Parameters:

            - self (Athlete): the looser.
            - opponent (Athlete): the winner of the match.
        '''



    def exportJSON(self):
        return '{"athlete": { \
                    "name": "' + self.name + '", \
                    "sport": "' + self.sport + '", \
                    "birth_year": ' + str(self.birth_year) + ', \
                    "rank": ' + str(self.rank) + ', \
                    "win": ' + str(self.win) + ', \
                    "loss": ' + str(self.loss) + ', \
                    "draw": ' + str(self.draw) + ' } \
                }'

    def calculateRank(self):
        '''
        ELO ranking using the rule of 400.
        '''
        sum_win = sum(self.win)
        sum_loss = sum(self.loss)
        sum_draw = sum(self.draw)
        
        rank_win = sum_win + 400 * len(self.win)        
        rank_loss = sum_loss + 400 * len(self.loss)        
        rank_draw = sum_draw + 400 * len(self.draw)
        return int((rank_win + rank_draw + rank_loss) / (len(self.win) + len(self.draw) + len(self.loss)))