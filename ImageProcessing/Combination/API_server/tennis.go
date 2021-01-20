package main

import (
	"math"
	"fmt"
)

/********* REAL DEDUCTION FUNCTIONS *************/

// GLOBAL : PLAYERS POINTERS
var prevPlayerTop *Player = nil
var prevPlayerBtm *Player = nil

// BALL POINTER
var prevBall *Ball = nil

const(
	TOP = 0
	BOTTOM = 1
)

func deductFrame(input DarknetData) FrameDeduction {
	var str string = ""

	playersIdentified := FindPlayers(input.Objects)
	if(playersIdentified != nil){
		playerTop := (*playersIdentified)[TOP]
		playerBtm := (*playersIdentified)[BOTTOM]

		if(prevPlayerTop == nil || prevPlayerBtm == nil){ //Needs initialization(first)
			prevPlayerTop = &playerTop
			prevPlayerBtm = &playerBtm
		}else{
			previousTop := *prevPlayerTop
			var mvmtTop Vector2 = VecDifference(playerTop.Pos,previousTop.Pos)
			str += "Player Top moved : "+mvmtTop.String()

			previousBtm := *prevPlayerBtm
			var mvmtBtm Vector2 = VecDifference(playerBtm.Pos,previousBtm.Pos)
			str += "Player Bottom moved : "+mvmtBtm.String()
		}
	}

	ball_ref := FindBall(input.Objects)
	if(ball_ref != nil){
		ball := ObjToBall(*ball_ref);
		str+= "\n Ball position : "+ball.Pos.String()
		//Ball speed
		if(prevBall == nil){
			prevBall = &ball
		}else{
			ballMvmt := VecDifference(ball.Pos,(*prevBall).Pos)
			str += " - moved "+ballMvmt.String()
			prevBall = &ball
		}
	}

	deduct := FrameDeduction{ FrameID : input.FrameID, Text: str }
	return deduct
}

type Position struct{
	x float64
	y float64
}
type Vector2 Position;

type Player struct{
	Name string
	Points int
	Pos Position
}

type Ball struct{
	Pos Position
}

func (p Position) String() string{
	return fmt.Sprintf("{x:%f, y:%f}",p.x,p.y)
}

func (v Vector2) String() string{
	return fmt.Sprintf("{x:%f, y:%f}",v.x,v.y)
}

func (p Player) String() string{
	return fmt.Sprintf("Name: %s, Points: %d, Pos: %s", p.Name, p.Points, p.Pos)
}

func FindPersons(objs []DetectedObject) []DetectedObject{
	results := []DetectedObject{}
	for i := 0; i < len(objs); i++ {
		if objs[i].Name == "person"{
			results = append(results, objs[i])
		}
	}
	return results
}

func FindRackets(objs []DetectedObject) []DetectedObject{
	if(len(objs)==0){
		return nil
	}
	results := []DetectedObject{}
	for i := 0; i < len(objs); i++ {
		if objs[i].Name == "tennis racket"{
			results = append(results, objs[i])
		}
	}
	return results
}

func ObjToPlayer(obj DetectedObject) Player{
	return Player{Name:"", Points:0, Pos:Position{x:float64(obj.Coords.CenterX), y:float64(obj.Coords.CenterY)}}
}

func ObjToBall(obj DetectedObject) Ball{
	return Ball{Pos:Position{x:float64(obj.Coords.CenterX), y:float64(obj.Coords.CenterY)}}
}

func FindPlayers(objs []DetectedObject) *[2]Player{
	if(len(objs)==0){
		return nil
	}

	persons := FindPersons(objs)
	var players [2]Player
	if(len(persons)==0){
		return nil
	}
	tennisRackets := FindRackets(objs)
	//In this block, we try to check if two players are holding a racket
	if len(tennisRackets) >= 2 && len(persons)>=2 {
		var pR []DetectedObject = []DetectedObject{}
		for i := 0; i < 2; i++ {
			//Check if one of the players touches the racket
			for _, v := range persons {
				if IsTouching(tennisRackets[i].Coords, v.Coords){
					//We found a player that touches the [i] racket
					pR = append(pR, v)
					break
				}
			}
		}
		//Did we find 2 players holding a racket ?
		if len(pR) == 2{
			if pR[0].Coords.CenterY > pR[1].Coords.CenterY{
				players[BOTTOM]= ObjToPlayer(pR[0])
				players[TOP]= ObjToPlayer(pR[1])
				return &players
			}else{
				players[TOP]= ObjToPlayer(pR[0])
				players[BOTTOM]= ObjToPlayer(pR[1])
				return &players
			}
		}
	} //Ends here means failure, classic detection below:
	top := FindTopObjects(persons)
	if(len(top)>0){ //Found some players in the top
		players[TOP] = ObjToPlayer(NearestObjToNet(top))
	}else{
		if(prevPlayerTop != nil){
			players[TOP] = *prevPlayerTop
		}else{
			return nil
		}
	}
	btm := FindBottomObjects(persons)
	if(len(btm)>0){ //Found some players in the bottom
		players[BOTTOM] = ObjToPlayer(NearestObjToNet(btm))
	}else{
		if(prevPlayerTop != nil){
			players[BOTTOM] = *prevPlayerBtm
		}else{
			return nil
		}
	}
	return &players
}

func FindBall(objs []DetectedObject) *DetectedObject{
	if(len(objs)==0){
		return nil
	}
	for i := 0; i < len(objs); i++ {
		if objs[i].Name == "sports ball"{
			ball := &objs[i]
			return ball
		}
	}
	return nil
}

func MinusSquare(a float64,b float64) float64{
	return (a-b)*(a-b)
}

func FindTopObjects(objs []DetectedObject) []DetectedObject{
	if(len(objs)==0){
		return nil
	}
	results := []DetectedObject{}
	for i := 0; i < len(objs); i++ {
		if objs[i].Coords.CenterY < 0.5{
			results = append(results, objs[i])
		}
	}
	return results
}

func FindBottomObjects(objs []DetectedObject) []DetectedObject{
	if(len(objs)==0){
		return nil
	}
	results := []DetectedObject{}
	for i := 0; i < len(objs); i++ {
		if objs[i].Coords.CenterY > 0.5{
			results = append(results, objs[i])
		}
	}
	return results
}

func DistanceToPoint(a Position, b Position) float64{
	SQdistanceX := MinusSquare(a.x,b.x)
	SQdistanceY := MinusSquare(a.y,b.y)
	return math.Sqrt(SQdistanceX + SQdistanceY)
}

func NearestObjToNet(objs []DetectedObject) DetectedObject{
	nestPos := Position{x:0.5, y:0.5}
	var minId int =0
	var minDist float64 = 99999999.9
	for i, o := range objs {
		var pos Position = Position{x:float64(o.Coords.CenterX), y:float64(o.Coords.CenterY)}
		var sqX float64 = MinusSquare(pos.x,nestPos.x)
		var sqY float64 = MinusSquare(pos.y,nestPos.y)
		if( sqX > sqY ){ continue }
		var dist float64 = DistanceToPoint(pos, nestPos)
		if dist < minDist {
			minId = i
			minDist = dist
		}
	}
	return objs[minId]
}

//Returns the speed in relative units per second
//For 1 FPS : delta = 1/1 =1; for 25FPS, delta = 1/25 = 0.04
func CalculateSpeed(delta float64, distance float64) float64{
	return distance / delta
}

func VecDifference(a Position, b Position) Vector2{
	return Vector2{a.x-b.x, a.y-b.y}
}

func WithinFloat64(v float64, min float64, max float64) bool{
	return (v >= min && v <= max )
}
func WithinFloat32(v float32, min float32, max float32) bool{
	return (v >= min && v <= max )
}

func IsTouching(a BBox, b BBox) bool{
	aX := float64(a.CenterX)
	aY := float64(a.CenterY)
	aWidth := float64(a.Width)
	aHeight:= float64(a.Height)

	bX := float64(b.CenterX)
	bY := float64(b.CenterY)
	bWidth := float64(b.Width)
	bHeight:= float64(b.Height)

	if (math.Abs((aX + aWidth/2) - (bX + bWidth/2)) * 2 < (aWidth + bWidth)){
		if (math.Abs((aY + aHeight/2) - (bY + bHeight/2)) * 2 < (aHeight + bHeight)) {
			return true
		}
	}
	return false
}