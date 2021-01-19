package main

import (
	"math/rand"
)

/******** MOCK UP FUNCTIONS *********/

//Mocks up a set of random detected objects
func randomObject(id int) DetectedObject{
	var labels = []string{"ball","car","person","tennis racket","remote","dog","horse","spider"}
	var id_ = rand.Intn(len(labels)-1);
	return DetectedObject{
		ClassId     : id_,
		Name        : labels[id_],
		Coords		: BBox{rand.Float32()*1000, rand.Float32()*1000, rand.Float32() * 100,  rand.Float32() * 100},
		Confidence  : 50.0 + rand.Float32() * 50,
	}
}

//Mocks up data for one frame returned by darknet
func mockupDarknetData(frame_id int) DarknetData {
	var nbObjects int = 7

	var detectedObjects []DetectedObject
	for i := 0; i < nbObjects; i++ {
		detectedObjects = append(detectedObjects, randomObject(i))
	}
	ret := DarknetData{FrameID: frame_id, Filename: "", Objects : detectedObjects }
	return ret
}

func mockupFrameDeduction(frame_id int) FrameDeduction {
	var positions = []string{"on the left","to the right","in the air","on the ground"}
	var vitesses = []string{"slowly","rapidly", "in a smash", "in a hurry", ""}
	var actionsBalle = []string{"launches the ball","catches the ball","sends back the ball","hits the ball"}
	//var actionsJeu = []string{"scores a new point", "did a mistake","is doing well", "makes a smash!"}
	var participants = []string{"The american","The two-times champion","The adversary", "Our player","The Irish"}

	part := participants[rand.Intn(len(participants)-1)]
	act  := actionsBalle[rand.Intn(len(actionsBalle)-1)]
	pos  := positions[rand.Intn(len(positions)-1)]
	vit  := vitesses[rand.Intn(len(vitesses)-1)]

	var str string = part+" "+act+" "+pos+" "+vit
	deduct := FrameDeduction{ FrameID : frame_id, Text: str }
	return deduct
}

//Mocks up data for a whole video analysed
func mockupResponseData(nbFrames int) ResponseData{
	var media_infos MediaInfos = MediaInfos{Url: "my_url", Duration: (nbFrames/25)}
	var frames_results []FrameDeduction
	for i := 0; i < nbFrames; i++ {
		frames_results = append(frames_results, mockupFrameDeduction(i))
	}
	resp := ResponseData{ Media: media_infos, FramesProcessed: nbFrames, Deductions : frames_results }
	return resp
}
