import json


class Athlete:
    def __init__(self, name='athlete_name', sport='athlete_sport', birth_year=1970, rank=-1, win=[], loss=[], draw=[]):
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
        if rank == -1:
            self.rank = self.calculateRank400()
        else:
            self.rank = rank

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

    def calculateRank400(self):
        '''
        ELO ranking using the rule of 400.
        '''
        if len(self.win) + len(self.loss) + len(self.draw) == 0:
            return 1500

        sum_win = sum(self.win)
        sum_loss = sum(self.loss)
        sum_draw = sum(self.draw)

        nb_win = len(self.win)
        nb_loss = len(self.loss)
        nb_draw = len(self.draw)

        nbGames = len(self.win) + len(self.loss) + len(self.draw)

        # The player need at least 10 games to be ranked
        if nb_win + nb_draw + nb_loss < 10:
            return 1500
        else:
            return int(((sum_win + sum_loss) + 400 * (len(self.win) - len(self.loss))) / nbGames)

    def updateRankKFactor(self, opponent, k, winner):
        '''
        ELO ranking using the rule of k-factor.

        Parameters:

            - self (Athlete):
            - Opponent (Athlete):
            - k (int): factor.
            - winner (list(Athlete)): "if there is 2 winners, it's a draw."
        '''
        # if it is a draw
        if len(winner) != 1:
            return

        gap = abs(self.rank - opponent.rank)
        
        #if it is a win
        if winner[0] == self:
            if gap > 400:
                self.rank += k
            else:
                self.rank += int(k * (1 - self.chanceOfWinning(opponent) / 100))
        #if it is a loose
        else:
            if gap > 400:
                self.rank -= k
            else:
                self.rank += int(k * (0 - self.chanceOfWinning(opponent) / 100))

    def chanceOfWinning(self, opponnent):
        '''
        Give the chance of winning the opponent in %
        '''
        power = (opponnent.rank - self.rank) / 400
        res = 1 / (1 + pow(10, power)) * 100
        return round(res, 2)
