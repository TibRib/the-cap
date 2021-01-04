from ranking.Athlete import Athlete
import unittest, json
#from Athlete import *

class TestCreation(unittest.TestCase):

    def test_creation_empty(self):
        ath1 = Athlete()
        self.assertEqual(ath1.name, 'athlete_name', "Wrong name")
        self.assertEqual(ath1.sport, 'athlete_sport', "Wrong sport")
        self.assertEqual(ath1.birth_year, 1970, "Wrong birth year")
        self.assertEqual(ath1.rank, 1500, "Wrong rank")
        self.assertEqual(ath1.win, 10, "Wrong win")
        self.assertEqual(ath1.loss, 20, "Wrong loss")

    def test_creation_full(self):
        ath1 = Athlete(name='john', birth_year=1999, sport='Curling', rank=1907, win=200, loss=1)
        self.assertEqual(ath1.name, 'john', "Wrong name")
        self.assertEqual(ath1.sport, 'Curling', "Wrong sport")
        self.assertEqual(ath1.birth_year, 1999, "Wrong birth year")
        self.assertEqual(ath1.rank, 1907, "Wrong rank")
        self.assertEqual(ath1.win, 200, "Wrong win")
        self.assertEqual(ath1.loss, 1, "Wrong loss")

class TestJSON(unittest.TestCase):

    def test_export_empty(self):
        ath1 = Athlete()
        created = json.loads(ath1.exportJSON())
        self.assertEqual(created['athlete']['name'], 'athlete_name', "Wrong name")
        self.assertEqual(created['athlete']['sport'], 'athlete_sport', "Wrong sport")
        self.assertEqual(created['athlete']['birth_year'], 1970, "Wrong birth year")
        self.assertEqual(created['athlete']['rank'], 1500, "Wrong rank")
        self.assertEqual(created['athlete']['win'], 10, "Wrong win")
        self.assertEqual(created['athlete']['loss'], 20, "Wrong loss")

    def test_export_full(self):
        ath1 = Athlete(name='john', birth_year=1999, sport='Curling', rank=1907, win=200, loss=1)
        created = json.loads(ath1.exportJSON())
        self.assertEqual(created['athlete']['name'], 'john', "Wrong name")
        self.assertEqual(created['athlete']['sport'], 'Curling', "Wrong sport")
        self.assertEqual(created['athlete']['birth_year'], 1999, "Wrong birth year")
        self.assertEqual(created['athlete']['rank'], 1907, "Wrong rank")
        self.assertEqual(created['athlete']['win'], 200, "Wrong win")
        self.assertEqual(created['athlete']['loss'], 1, "Wrong loss")

if __name__ == '__main__':
    unittest.main()