package main

import (
	"testing"
)

func TestFindPersons(t* testing.T){
	objs := []DetectedObject{
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.456400, CenterY:0.846349, Width:0.077099, Height:0.253434}},
		DetectedObject{ClassId:0, Name:"chair", Confidence:1.0, Coords:BBox{CenterX:0.191585, CenterY:0.478454, Width:0.039324, Height:0.086070}},
		DetectedObject{ClassId:0, Name:"sports ball", Confidence:1.0, Coords:BBox{CenterX:0.775891, CenterY:0.423228, Width:0.036892, Height:0.086447}},
	}
	expected := []DetectedObject{ 
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.456400, CenterY:0.846349, Width:0.077099, Height:0.253434}},
	}
	got := FindPersons(objs)
	if !ObjArrayEquals(got, expected){
		t.Error("Expected [1]DetectedObjects{ ... Name:'person' }, got something else")
		for _, v := range got {
			t.Error(v)
		}
	}
}

func TestFindPlayers(t *testing.T){
	objs := []DetectedObject{
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.456400, CenterY:0.846349, Width:0.077099, Height:0.253434}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.191585, CenterY:0.478454, Width:0.039324, Height:0.086070}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.775891, CenterY:0.423228, Width:0.036892, Height:0.086447}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.322108, CenterY:0.085600, Width:0.017033, Height:0.092008}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.614659, CenterY:0.163872, Width:0.029228, Height:0.111093}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.495327, CenterY:0.085647, Width:0.021856, Height:0.083363}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.271874, CenterY:0.086701, Width:0.015931, Height:0.085227}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.714455, CenterY:0.085451, Width:0.019302, Height:0.087210}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.606026, CenterY:0.083786, Width:0.020398, Height:0.086905}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.150621, CenterY:0.312010, Width:0.057598, Height:0.154962}},
		DetectedObject{ClassId:0, Name:"person", Confidence:1.0, Coords:BBox{CenterX:0.880421, CenterY:0.277108, Width:0.029861, Height:0.096801}},
	}
	expected := [2]Player{ 
		Player{Name:"", Points:0, Pos:Position{ x:0.614659, y:0.163872} },
		Player{Name:"", Points:0, Pos:Position{ x:0.456400, y:0.846349} },
	}
	got := FindPlayers(objs)
	if len(got) != 2 {
		t.Errorf("%d players in findPlayers(); Want 2",len(got))
	}
	if(got[0] == expected[0] && got[1] == expected[1]){
		t.Error("got[0] != expected[0] => ",got[0] != expected[0])
		t.Error("Expected [0]:", expected[0],"Obtained [0]:",got[0])

		t.Error("got[1] != expected[1] => ",got[1] != expected[1])
		t.Error("Expected [1]:", expected[1],"Obtained [1]:",got[1])
	}
}

func TestMinusSquare(t *testing.T) {
	got := MinusSquare(0.0,1.0)
	if got != 1.0 {
		t.Errorf("MinusSquare error : expected 1.0, got %f",got)
	}
	got = MinusSquare(-5.0,5.0)
	if got != 100.0 {
		t.Errorf("MinusSquare error : expected 100.0, got %f",got)
	}
}

func TestDistanceToPoint(t* testing.T){
	testCases := []struct {
		a	Position
		b 	Position
		expected float64
	}{
		{
			a: Position{0.5,0.5},
			b: Position{0.5,0.5},
			expected: 0.0,
		},
		{
			a: Position{1.0,0.0},
			b: Position{0.0,0.0},
			expected: 1.0,
		},
		{
			a: Position{1.0,0.0},
			b: Position{0.0,0.0},
			expected: 1.0,
		},
		{
			a: Position{3.0,3.5},
			b: Position{-5.1,5.2},
			expected: 8.276472678623424,
		},
	}
	for _, tC := range testCases {
		if output := DistanceToPoint(tC.a,tC.b); output != tC.expected{
			t.Error("Test Failed: a:({},{}) b:({},{}), received {}, expected {}", 
			tC.a.x, tC.a.y,
			tC.b.x, tC.b.y,
			output, tC.expected)
		}
	}
}

func TestNearestObjToNet(t *testing.T) {
	objs := []DetectedObject{
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.191585, CenterY:0.478454, Width:0.039324, Height:0.086070}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.775891, CenterY:0.423228, Width:0.036892, Height:0.086447}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.322108, CenterY:0.085600, Width:0.017033, Height:0.092008}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.614659, CenterY:0.163872, Width:0.029228, Height:0.111093}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.495327, CenterY:0.085647, Width:0.021856, Height:0.083363}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.271874, CenterY:0.086701, Width:0.015931, Height:0.085227}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.714455, CenterY:0.085451, Width:0.019302, Height:0.087210}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.606026, CenterY:0.083786, Width:0.020398, Height:0.086905}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.150621, CenterY:0.312010, Width:0.057598, Height:0.154962}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.880421, CenterY:0.277108, Width:0.029861, Height:0.096801}},
	}
	got := NearestObjToNet(objs)
	expected := objs[3]
	if got != expected {
		t.Errorf("Failed : expected [3] to be nearest and in the net zone")
	}
}

func ObjArrayEquals(a []DetectedObject, b []DetectedObject) bool {
    if len(a) != len(b) {
        return false
    }
    for i, v := range a {
        if v != b[i] {
            return false
        }
    }
    return true
}

func TestFindTopObjects(t *testing.T) {
	input := []DetectedObject{
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.0, CenterY:0.42, Width:0.1, Height:0.1}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.4, CenterY:0.62, Width:0.1, Height:0.1}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.8, CenterY:0.72, Width:0.1, Height:0.1}},
	};
	expected := []DetectedObject{
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.0, CenterY:0.42, Width:0.1, Height:0.1}},
	};
	result := FindTopObjects(input)

	if !ObjArrayEquals(result, expected){
		t.Error("Test Failed: elements not expected {} != {}",len(result), len(expected))
		for _, v := range result {
			t.Error(v)
		}
	}
}

func TestFindBottomObjects(t *testing.T) {
	input := []DetectedObject{
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.0, CenterY:0.42, Width:0.1, Height:0.1}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.4, CenterY:0.62, Width:0.1, Height:0.1}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.8, CenterY:0.72, Width:0.1, Height:0.1}},
	};
	expected := []DetectedObject{
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.4, CenterY:0.62, Width:0.1, Height:0.1}},
		DetectedObject{ClassId:0, Name:"", Confidence:1.0, Coords:BBox{CenterX:0.8, CenterY:0.72, Width:0.1, Height:0.1}},
	};
	result := FindBottomObjects(input)

	if !ObjArrayEquals(result, expected){
		t.Error("Test Failed: elements not expected {} != {}",len(result), len(expected))
		for _, v := range result {
			t.Error(v)
		}
	}
}
