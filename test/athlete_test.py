from ranking import athlete
import unittest, json
#from Athlete import *

class TestCreation(unittest.TestCase):

    def test_creation_empty(self):
        ath1 = athlete.Athlete()
        self.assertEqual(ath1.name, 'athlete_name', "Wrong name")
        self.assertEqual(ath1.sport, 'athlete_sport', "Wrong sport")
        self.assertEqual(ath1.birth_year, 1970, "Wrong birth year")
        self.assertEqual(ath1.rank, 1500, "Wrong rank")
        self.assertEqual(ath1.win, [], "Wrong win")
        self.assertEqual(ath1.loss, [], "Wrong loss")
        self.assertEqual(ath1.draw, [], "Wrong draw")

    def test_creation_full(self):
        ath1 = athlete.Athlete(name='john', birth_year=1999, sport='Curling', win=[2000, 3000], loss=[1000], draw=[1200])
        self.assertEqual(ath1.name, 'john', "Wrong name")
        self.assertEqual(ath1.sport, 'Curling', "Wrong sport")
        self.assertEqual(ath1.birth_year, 1999, "Wrong birth year")
        self.assertEqual(ath1.rank, 1500, "Wrong rank")
        self.assertEqual(ath1.win, [2000, 3000], "Wrong win")
        self.assertEqual(ath1.loss, [1000], "Wrong loss")
        self.assertEqual(ath1.draw, [1200], "Wrong draw")

class TestJSON(unittest.TestCase):
    def test_export_empty(self):
        ath1 = athlete.Athlete()
        created = json.loads(ath1.exportJSON())
        self.assertEqual(created['athlete']['name'], 'athlete_name', "Wrong name")
        self.assertEqual(created['athlete']['sport'], 'athlete_sport', "Wrong sport")
        self.assertEqual(created['athlete']['birth_year'], 1970, "Wrong birth year")
        self.assertEqual(created['athlete']['rank'], 1500, "Wrong rank")
        self.assertEqual(created['athlete']['win'], [], "Wrong win")
        self.assertEqual(created['athlete']['loss'], [], "Wrong loss")
        self.assertEqual(created['athlete']['draw'], [], "Wrong draw")

    def test_export_full(self):
        ath1 = athlete.Athlete(name='john', birth_year=1999, sport='Curling', win=[1600, 3000], loss=[], draw=[1000, 1000])
        created = json.loads(ath1.exportJSON())
        self.assertEqual(created['athlete']['name'], 'john', "Wrong name")
        self.assertEqual(created['athlete']['sport'], 'Curling', "Wrong sport")
        self.assertEqual(created['athlete']['birth_year'], 1999, "Wrong birth year")
        self.assertEqual(created['athlete']['rank'], 1500, "Wrong rank")
        self.assertEqual(created['athlete']['win'], [1600, 3000], "Wrong win")
        self.assertEqual(created['athlete']['loss'], [], "Wrong loss")
        self.assertEqual(created['athlete']['draw'], [1000, 1000], "Wrong draw")

class TestRanking(unittest.TestCase):
    def test_should_loose(self):
        B = athlete.Athlete(rank=1700)
        A = athlete.Athlete(rank=1900)
        self.assertEqual(A.chanceOfWinning(B), 75.97)
        self.assertEqual(B.chanceOfWinning(A), 100 - 75.97)
    
    def test_calculate_ranking400(self):
        win = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]
        ath_win = athlete.Athlete(win=win)
        self.assertEqual(ath_win.calculateRank400(), 2400)
        loss = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
        ath_loss = athlete.Athlete(loss=loss)
        self.assertEqual(ath_loss.calculateRank400(), 600)


    def test_update_ranking(self):
        #gap testing
        ath1 = athlete.Athlete(rank = 1000)
        ath2 = athlete.Athlete(rank = 2000)
        #winning
        ath1.updateRankKFactor(ath2, 30, [ath1])
        self.assertEqual(ath1.rank, 1030)
        #loosing
        ath1.updateRankKFactor(ath2, 30, [ath2])
        self.assertEqual(ath1.rank, 1000)

        #classic testing
        ath3 = athlete.Athlete(rank = 1050)
        ath4 = athlete.Athlete(rank = 1032)
        #winning
        ath3.updateRankKFactor(ath4, 30, [ath3])
        self.assertEqual(ath3.rank, 1064)
        #loosing
        ath3 = athlete.Athlete(rank = 1050)
        ath3.updateRankKFactor(ath4, 30, [ath4])
        self.assertEqual(ath3.rank, 1035)
        #draw
        ath3.updateRankKFactor(ath4, 100, [ath3, ath4])






if __name__ == '__main__':
    unittest.main()