package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"sync"
	"os/exec"
	"bytes"
)

type BoundingBox struct{
	X int `json:"x"`
	Y int  `json:"y"`
	Area float32  `json:"area"`
}

type DetectedObject struct {
	Id 		int `json:"id"`
	Label   string `json:"label"`
	Confidence   float32 `json:"confidence"`
	BBox    BoundingBox    `json:"bbox"`
}

type Data struct{ //TODO : Add headers
	NbObjects int
	MediaUrl string `json:"media_url"`
	Detected []DetectedObject `json:"detected"`
}

type APIData struct{
	MediaToAnalyze string `json:"media_url"`
}

//Global labels
var labels = []string{"ball","car","person","tennis racket","remote","dog","horse","spider"}

func randomObject(id int) DetectedObject{
	return DetectedObject{
		Id 		     : id,
		Label        : labels[rand.Intn(len(labels)-1)],
		Confidence   : 50.0 + rand.Float32() * 50,
		BBox		 : BoundingBox{rand.Intn(1000), rand.Intn(1000), rand.Float32() * 100},
	}
}

//Data mocking used for providing the latter structured response
func mockupData(nbObjects int) Data {
	fmt.Printf("MOCKUP DATA Providing %v objects\n",nbObjects)
	var detectedObjects []DetectedObject
	for i := 0; i < nbObjects; i++ {
		detectedObjects = append(detectedObjects, randomObject(i))
	}
	data := Data{ NbObjects: nbObjects, MediaUrl:"", Detected: detectedObjects }
	return data
}

//Server API Handlers Object
type API_Handlers struct {
	sync.Mutex
	myData APIData
}

//Creates a new API_Handler object (constructor)
func newAPI_Handler() *API_Handlers {
	return &API_Handlers{myData: APIData{}}
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

//Get function of API_Handlers
func (h *API_Handlers) get(w http.ResponseWriter, r *http.Request) {
	//Read data
	h.Lock()
	apiData := h.myData
	h.Unlock()
	
	data := mockupData(30)
	data.MediaUrl = apiData.MediaToAnalyze

	//Turn into JSON
	jsonBytes, err := json.Marshal(data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Add("content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

//POST function of API_Handlers
func (h *API_Handlers) post(w http.ResponseWriter, r *http.Request) {
	/* Exemple:
	body : { "nbObjects" : 32 } */
	
	requestDump, err := httputil.DumpRequest(r, true)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("\nreceived POST : ")
	fmt.Println(string(requestDump))

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
		w.Write([]byte(fmt.Sprintf("The API requires a json content-type, but got a '%s' instead", content_type)))
		return
	}

	var inData APIData
	err = json.Unmarshal(bodyBytes, &inData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	
	h.Lock()
	h.myData = inData //Changes the data in memory with the one received
	if(h.myData.MediaToAnalyze != ""){
		w.WriteHeader(http.StatusOK)
		launchDetection(h.myData.MediaToAnalyze)
	}
	defer h.Unlock()

	return
}

func main() {
	var APIHandler = newAPI_Handler()
	http.HandleFunc("/", APIHandler.request)
	fmt.Printf("SERVER API RUNNING ON PORT 8080\n")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}

func launchDetection(url string){
	app := "./darknet"
    args := [11]string{"detector","demo","cfg/coco.data","cfg/yolov4.cfg","yolov4.weights",url,"-i","0","-json_port","8070","-dont_show"}

    cmd := exec.Command(app, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8],args[9],args[10])
	buf := &bytes.Buffer{}
	cmd.Stdout = buf
	if err := cmd.Start(); err != nil {
		fmt.Println("Failed to start cmd:", err)
	}
	fmt.Println("Darknet launched ! wait 5 seconds and access your :8070 port")
	// And when you need to wait for the command to finish:
	/*
	if err := cmd.Wait(); err != nil {
		fmt.Println("Cmd returned error:", err)
	}
	fmt.Println("[OUTPUT:]", buf.String())
	*/
	return
}
	
