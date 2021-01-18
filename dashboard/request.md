For having match won count : 
``` sql
select count(*) from matches where (player_id like '%djoko%' and player_victory is 't') or (opponent_id like '%djoko%' and player_victory is 'f');
```

For having total played macthes : 
```sql
select count(*) from matches where (player_id like '%djoko%') or (opponent_id like '%djoko%');
```