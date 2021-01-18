package main

import (
	"strconv"
	"math"
	"fmt"
)

/********* REAL DEDUCTION FUNCTIONS *************/
func deductFrame(input DarknetData) FrameDeduction {
	var str string = strconv.Itoa(input.FrameID)+" - I see "
	for _, obj := range input.Objects{
		str+= obj.Name+", "
	}
	deduct := FrameDeduction{ FrameID : input.FrameID, Text: str }
	return deduct
}

type Position struct{
	x float64
	y float64
}

type Player struct{
	Name string
	Points int
	Pos Position
}

func (p Position) String() string{
	return fmt.Sprintf("{x:%f, y:%f}",p.x,p.y)
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

func FindPlayers(objs []DetectedObject) [2]Player{
	var players [2]Player
	persons := FindPersons(objs)
	top := FindTopObjects(persons)
	btm := FindBottomObjects(persons)

	players[0] = ObjToPlayer(NearestObjToNet(top))
	players[1] = ObjToPlayer(NearestObjToNet(btm))

	return players
}

func MinusSquare(a float64,b float64) float64{
	return (a-b)*(a-b)
}

func FindTopObjects(objs []DetectedObject) []DetectedObject{
	results := []DetectedObject{}
	for i := 0; i < len(objs); i++ {
		if objs[i].Coords.CenterY < 0.5{
			results = append(results, objs[i])
		}
	}
	return results
}

func FindBottomObjects(objs []DetectedObject) []DetectedObject{
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