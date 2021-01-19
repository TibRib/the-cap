package main

import (
	"math"
	"fmt"
)

/********* REAL DEDUCTION FUNCTIONS *************/

// GLOBAL : PLAYERS POINTERS
var prevPlayerTop *Player = nil
var prevPlayerBtm *Player = nil

const(
	TOP = 0
	BOTTOM = 1
)

func deductFrame(input DarknetData) FrameDeduction {
	var str string = ""
	/*
	str = strconv.Itoa(input.FrameID)+" - I see "
	for _, obj := range input.Objects{
		str+= obj.Name+", "
	}
	*/
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

func ObjToPlayer(obj DetectedObject) Player{
	return Player{Name:"", Points:0, Pos:Position{x:float64(obj.Coords.CenterX), y:float64(obj.Coords.CenterY)}}
}

func FindPlayers(objs []DetectedObject) *[2]Player{
	if(len(objs)==0){
		return nil
	}
	var players [2]Player
	persons := FindPersons(objs)
	if(len(persons)==0){
		return nil
	}
	top := FindTopObjects(persons)
	if(len(top)>0){
		players[TOP] = ObjToPlayer(NearestObjToNet(top))
	}else{
		if(prevPlayerTop != nil){
			players[TOP] = *prevPlayerTop
		}else{
			return nil
		}
	}
	btm := FindBottomObjects(persons)
	if(len(btm)>0){
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