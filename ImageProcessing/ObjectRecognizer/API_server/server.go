package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"sync"
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
	Detected []DetectedObject `json:"detected`
}

type APIData struct{
	NbObjects int `json:"nb_objects`
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
	data := Data{ nbObjects, detectedObjects }
	return data
}

//Server API Handlers Object
type API_Handlers struct {
	sync.Mutex
	myData APIData
}

//Creates a new API_Handler object (constructor)
func newAPI_Handler() *API_Handlers {
	return &API_Handlers{myData: APIData{ NbObjects : 32}}
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
	
	data := mockupData(apiData.NbObjects)

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

	fmt.Printf("NBObjects: %v", inData.NbObjects)
	
	h.Lock()
	h.myData = inData //Changes the data in memory with the one received
	defer h.Unlock()
}

func main() {
	var APIHandler = newAPI_Handler()
	http.HandleFunc("/request", APIHandler.request)
	fmt.Printf("SERVER API RUNNING ON PORT 8080\n")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
