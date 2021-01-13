# Ranking API

Every request are put after ```you_url``` which can be ```http://localhost:5000```

## the *database* (which is in fact a ```csv```)
```
/api/athletes/all
```

Response : 
```json
[
  {
    "bestPoints": "2382", 
    "bestPointsDate": "2021-01-05", 
    "bestRank": "1", 
    "bestRankDate": "2011-03-21", 
    "country_id": "SRB", 
    "country_name": "Serbia", 
    "name": "Novak_Djokovic", 
    "points": "2382", 
    "pointsDiff": "0", 
    "rank": "1", 
    "rankDiff": "0"
  },
  {...},
  {
    "bestPoints": "2552", 
    "bestPointsDate": "1970-01-01", 
    "bestRank": "1", 
    "bestRankDate": "2008-06-16", 
    "country_id": "ESP", 
    "country_name": "Spain", 
    "name": "Rafael_Nadal", 
    "points": "2375", 
    "pointsDiff": "-24", 
    "rank": "2", 
    "rankDiff": "0"
  }
]

```

## the prediction
for now the only predicition is purely based on ```elo```.

You must have the **name** of the 2 players of the match.

```
/api/predict/elo/?A_name=Novak_Djokovic&B_name=Rafael_Nadal
```
Response :
```json
{
  "prediction": {
    "A_winner": 51.01, 
    "B_winner": 48.99
  }
}
```