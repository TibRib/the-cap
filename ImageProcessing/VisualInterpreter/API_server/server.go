package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"sync"
	"time"
)

type APIData struct{ }

type ResponseData struct{
	Text string `json:"text"`
}

//Globals for mockups
var positions = []string{"on the left","to the right","in the air","on the ground"}
var vitesses = []string{"slowly","rapidly", "in a smash", "in a hurry", ""}
var actionsBalle = []string{"launches the ball","catches the ball","sends back the ball","hits the ball"}
var actionsJeu = []string{"scores a new point", "did a mistake","is doing well", "makes a smash!"}
var participants = []string{"The american","The two-times champion","The adversary", "Our player","The Irish"}

func mockupSentence() string{
	part := participants[rand.Intn(len(participants)-1)]
	act  := actionsBalle[rand.Intn(len(actionsBalle)-1)]
	pos  := positions[rand.Intn(len(positions)-1)]
	vit  := vitesses[rand.Intn(len(vitesses)-1)]

	var str string
	str = part+" "+act+" "+pos+" "+vit
	return str
}

func mockupData() ResponseData{
	str := mockupSentence()
	fmt.Println("'"+str+"'")
	return ResponseData{Text :str }
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
	/* Read data if needed
	h.Lock()
	myRead := h.myData
	h.Unlock()
	*/
	data := mockupData()

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
	h.myData = inData
	defer h.Unlock()
}

func main() {
	rand.Seed(time.Now().UTC().UnixNano())

	var APIHandler = newAPI_Handler()
	http.HandleFunc("/", APIHandler.request)
	fmt.Printf("SERVER API RUNNING ON PORT 8080\n")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
