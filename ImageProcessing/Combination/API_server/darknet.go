package main

import (
	"encoding/json"
	"net/http"
	"os/exec"
	"bytes"
	"time"
	"log"
	"strconv"
	"fmt"
)

/******** STRUCTURES *********/
type BBox struct{
	CenterX float32 `json:"center_x"`
	CenterY float32 `json:"center_y"`
	Width, Height float32
}

type DetectedObject struct{
	ClassId int `json:"class_id"`
	Name string `json:"name"`
	Coords BBox `json:"relative_coordinates"`
	Confidence float32 `json:"confidence"`
}

type DarknetData struct {
	FrameID int `json:"frame_id"`
	Filename string `json:"filename"`
	Objects []DetectedObject `json:"objects"`
}

type FrameDeduction struct {
	FrameID int `json:"frame_id"`
	Text string `json:"text"`
}

func (d DetectedObject) String() string{
	return fmt.Sprintf("ClassID: %d, Name: %s, Confidence: %f, Coords{x: %f, y: %f, w: %f, h:%f }",
		d.ClassId, d.Name, d.Confidence, d.Coords.CenterX, d.Coords.CenterY, d.Coords.Width, d.Coords.Height)
}

/******** DARKNET JSON STREAM PARSING FUNCTIONS *********/
func printObject(obj DetectedObject){
	log.Printf("\t'%s' - %v%% sure - coords:{x: %v, y: %v, width: %v, height:%v}\n",
		obj.Name,
		obj.Confidence,
		obj.Coords.CenterX,	obj.Coords.CenterY, obj.Coords.Width, obj.Coords.Height,
	)
}
func decodeJSON(r *http.Response, print_results bool){
	dec := json.NewDecoder(r.Body)
	// read open bracket
	t, err := dec.Token()
	if err != nil {
		log.Println(err)
		return
	}
	log.Printf("%T: %v\n", t, t)
	// while the array contains values
	for dec.More() {
		var m DarknetData
		// decode an array value (Message)
		err := dec.Decode(&m)
		if err != nil {
			log.Println("Error :: New Json stream line gives wrong value")
			log.Println(err)
			return
		}
		if(print_results){
			log.Printf("--- Frame %v: %v objects :\n", m.FrameID, len(m.Objects))
			for _, obj := range m.Objects {
				printObject(obj)
			}
		}
		if len(deducted) > MAX_BUFFER_deducted{
			//Pop front of array -- empty for now..
			deducted = nil
			deducted = []FrameDeduction{}
		}
		deducted = append(deducted, deductFrame(m))
	}
	// read closing bracket
	t, err = dec.Token()
	if err != nil {
		log.Println("Error :: Json finished without closing !")
		log.Println(err)
		return
	}
	log.Printf("%T: %v\n", t, t)

	go onDetectionEnded()
}

/******* DARKNET EXECUTION FUNCTIONS *******/
func launchDetection(url string){
	cmd := exec.Command("./darknet",
		"detector","demo",
		"cfg/coco.data","cfg/yolov4.cfg","yolov4.weights",
		url,
		"-i","0",
		"-json_port","8070",
		"-dont_show",
		"-width","800",
		"-height","450",
		"-dontdraw_bbox",
		)
	buf := &bytes.Buffer{}
	cmd.Stdout = buf
	if err := cmd.Start(); err != nil {
		log.Println("Failed to start cmd:", err)
	}
	log.Println("Darknet launched ! wait 5 seconds and access your :8070 port")
	go launchDecoding()
	return
}

const darknetJSONStreamUrl = "http://localhost:8070"

func launchDecoding(){
	deducted = []FrameDeduction{}
	const MAX_TRY = 15

	var (
        err      error
        resp *http.Response
        nbTries  int = 0
    )
	for nbTries < MAX_TRY{
		resp, err = http.Get(darknetJSONStreamUrl)
		if err != nil {
			nbTries++
			if(nbTries >= MAX_TRY){
				log.Println("Err : couldnt access "+darknetJSONStreamUrl+" after "+strconv.Itoa(nbTries)+" try...")
				return
			}
			time.Sleep(1 * time.Second)
			
			continue
		}else{
			break
		}
	}
	if resp != nil {
		defer resp.Body.Close()
		log.Println("Successful access to "+darknetJSONStreamUrl+" after "+strconv.Itoa(nbTries)+" tries.")
        decodeJSON(resp, false) //Set to 2nd parameter to true for debugging 
    }
	
	
}