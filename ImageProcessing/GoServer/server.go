package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
)

type Data struct {
	Name    string `json:"name"`
	Surname string `json:"surname"`
	PosX    int    `json:"pos_x"`
	PosY    int    `json:"pos_y"`
}

//Data mocking used for providing the latter structured response
func mockupData() Data {
	return Data{
		Name:    "Test",
		Surname: "TestSurname",
		PosX:    0,
		PosY:    0,
	}
}

//Server API Handlers Object
type API_Handlers struct {
	sync.Mutex
	myData Data
}

//Creates a new API_Handler object (constructor)
func newAPI_Handler() *API_Handlers {
	return &API_Handlers{myData: mockupData()} //Inits with the mockupData
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
	data := h.myData
	h.Unlock()

	//Turn into JSON
	jsonBytes, err := json.Marshal(data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	w.Header().Add("content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

//POST function of API_Handlers
func (h *API_Handlers) post(w http.ResponseWriter, r *http.Request) {
	bodyBytes, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	var inData Data
	err = json.Unmarshal(bodyBytes, &inData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
	}
	h.Lock()
	h.myData = inData //Changes the data in memory with the one received
	defer h.Unlock()
	fmt.Println("received post data", inData)
}

func main() {
	var APIHandler = newAPI_Handler()
	http.HandleFunc("/request", APIHandler.request)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
