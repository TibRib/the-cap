package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"
	"math/rand"
	"log"
	"sync"
)

/******** STRUCTURES *********/
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


var deducted []FrameDeduction
const MAX_BUFFER_deducted = 50


func onDetectionEnded(){
	log.Println("Detection ended !")
	APIHandler.mutex.Lock()
	APIHandler.DetectionIsRunning = false
	APIHandler.mutex.Unlock()
	log.Println("Waiting for new calls...")
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
var APIHandler *API_Handlers

func main() {
	rand.Seed(time.Now().UTC().UnixNano())
	APIHandler = newAPI_Handler()
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