package main

import (
	"encoding/json"
	"math/rand"
	"io/ioutil"
	"net/http"
	"os/exec"
	"bytes"
	"time"
	"log"
	"sync"
	"strconv"
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

type InputData struct{
	MediaToAnalyze string `json:"media_url"`
}

type MediaInfos struct{
	Url string `json:"url"`
	Duration int `json:"duration"`
}

type ResponseData struct{
	Media MediaInfos `json:"media"`
	FramesProcessed int `json:"frames_processed"`
	Deductions []FrameDeduction `json:"deductions"`
}

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

/********* REAL DEDUCTION FUNCTIONS *************/
func deductFrame(input DarknetData) FrameDeduction {
	var str string = strconv.Itoa(input.FrameID)+" - I see "
	for _, obj := range input.Objects{
		str+= obj.Name+", "
	}
	deduct := FrameDeduction{ FrameID : input.FrameID, Text: str }
	return deduct
}

var deducted []FrameDeduction
const MAX_BUFFER_deducted = 50

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
	deducted = nil //Free the memory
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

/******** API HANDLERS **********/

//Server API Handle Class
type API_Handlers struct {
	mutex *sync.Mutex
	DetectionIsRunning bool
}
//Constructor
func newAPI_Handler() *API_Handlers {
	return &API_Handlers{DetectionIsRunning : false, mutex: &sync.Mutex{}}
}

//Redirects method to GET, POST and other allowed methods
func (h *API_Handlers) request(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		h.get(w, r)
		return
	case "POST":
		h.post(w, r)
		return

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("Method not allowed."))
		return
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

//Get function of API_Handlers
func (h *API_Handlers) get(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	//TODO : Remplacer par véritable data
	//data := mockupResponseData(25)
	var nbFrames =749
	var media_infos MediaInfos = MediaInfos{Url: "my_url", Duration: (nbFrames/25)}
	data := ResponseData{ Media: media_infos, FramesProcessed: nbFrames, Deductions : deducted }

	//Clear the deduction array
	h.mutex.Lock()
	deducted = nil
	deducted = []FrameDeduction{}
	h.mutex.Unlock()

	//Turn data into JSON
	jsonBytes, err := json.Marshal(data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	//Write on the response
	w.Header().Add("content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

//POST -- Handles the receiption of a 'media_url':"..." json content and launches the query if it's ok
func (h *API_Handlers) post(w http.ResponseWriter, r *http.Request) {
	bodyBytes, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	content_type := r.Header.Get("content-type")
	if content_type != "application/json" {
		w.WriteHeader(http.StatusUnsupportedMediaType)
		w.Write([]byte("The API requires a json content-type, but got a '"+content_type+"' instead"))
		return
	}

	var inData InputData
	err = json.Unmarshal(bodyBytes, &inData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	
	var detectionIsRunning bool

	h.mutex.Lock()
	detectionIsRunning = h.DetectionIsRunning
	h.mutex.Unlock()

	if(detectionIsRunning){
		w.WriteHeader(http.StatusTooEarly)
		w.Write([]byte("Analysis ALREADY RUNNING"))
	}else{
		if(inData.MediaToAnalyze != ""){
			//TODO : save to a structure
			log.Println("Media URL received, launching Darknet!")
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("Received your URL : "+inData.MediaToAnalyze))
	
			h.mutex.Lock()
			h.DetectionIsRunning = true
			h.mutex.Unlock()

			go launchDetection(inData.MediaToAnalyze)
		}else{
			w.WriteHeader(http.StatusExpectationFailed)
			w.Write([]byte("media_url required for analysis"))
		}
	}
	
	return
}

/******** MAIN *********/

func main() {
	rand.Seed(time.Now().UTC().UnixNano())
	var APIHandler = newAPI_Handler()
	http.HandleFunc("/", APIHandler.request)
	log.Printf("SERVER API RUNNING ON PORT 8080\n")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}

/****** TODOS ********/
//TODO : FIFO Ring Buffer for detected[]
	// + Better implementation of the global buffer to avoid spaguetti code