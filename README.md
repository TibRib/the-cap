![The cap banner](img/THE_CAP.png)

# Meet ```the CAP```

```the CAP``` is a **student project** aimed toward the <ins>real-time</ins> analysis of **sport games**.

Its name comes from its main purpose : **Comment, Analyse, Predict**.



## Featuring

### Comments

- Lifelike voiced robot
- Real-time reactions to the events in game
- Auto messaging

### Image Analysis

- Determine who currently has the ball
- Able to locate players and others in space

### Live Prediction

- Real-time diagnostics while the game is playing
- First-hand estimations of the winning chances thanks to data-mining

# launching dockers :
- ranking containers : 
  ``` bash
  sudo docker build . -t py-api:0.1 ; sudo docker run -p 127.0.0.1:8080:5000 -it py-api:0.1
  ```