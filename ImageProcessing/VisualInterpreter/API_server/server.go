package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"io/ioutil"
	"net/http"
	"sync"
	"time"
	"log"
	"runtime"
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
	/* Read my data if needed
	h.Lock()
	myRead := h.myData
	h.Unlock()
	*/
	data := mockupData()

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

//POST function of API_Handlers
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
		w.Write([]byte(fmt.Sprintf("The API requires a json content-type, but got a '%s' instead", content_type)))
		return
	}

	type StreamInfos struct{
		Url string
	}

	var inData StreamInfos
	err = json.Unmarshal(bodyBytes, &inData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	if inData.Url != "" {
		fmt.Println("Url recognized, I'll go and try fetching this one...")
		decodeJSON(inData.Url)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(fmt.Sprintf("Received your URL : '%s'", inData.Url)))
	}else{
		fmt.Println("Received a POST but no 'url' field... ")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(fmt.Sprintf("Received your POST but no 'url' field... ")))
	}
	/* If needs to write data, lock the mutex ! */ /*
	h.Lock()
	h.myData = inData
	defer h.Unlock()
	*/
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

func decodeJSON(endpoint string){
	http := &http.Client{}

	r, httperr := http.Get(endpoint)
	if httperr != nil {
		log.Println(httperr)
		log.Println("Connexion is not possible :(")
		return
    }
	defer r.Body.Close()
	
	dec := json.NewDecoder(r.Body)

	// read open bracket
	t, err := dec.Token()
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Printf("%T: %v\n", t, t)

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

		fmt.Printf("--- Frame %v: %v objects :\n", m.FrameID, len(m.Objects))
		for _, obj := range m.Objects {
			printObject(obj)
		}
		//If you want to see the memory usage, use PrintMemUsage() here

	}

	// read closing bracket
	t, err = dec.Token()
	if err != nil {
		log.Println("Error :: Json finished without closing !")
		log.Println(err)
		return
	}
	fmt.Printf("%T: %v\n", t, t)

}

func printObject(obj DetectedObject){
	fmt.Printf("\t'%s' - %v%% sure - coords:{x: %v, y: %v, width: %v, height:%v}\n",
		obj.Name,
		obj.Confidence,
		obj.Coords.CenterX,	obj.Coords.CenterY, obj.Coords.Width, obj.Coords.Height,
	)
}


// Outputs the current, total and OS memory being used
func PrintMemUsage() {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	// For info on each, see: https://golang.org/pkg/runtime/#MemStats
	fmt.Printf("Alloc = %v MiB", bToMb(m.Alloc))
	fmt.Printf("\tTotalAlloc = %v MiB", bToMb(m.TotalAlloc))
	fmt.Printf("\tSys = %v MiB", bToMb(m.Sys))
	fmt.Printf("\tNumGC = %v\n", m.NumGC)
}

func bToMb(b uint64) uint64 {
return b / 1024 / 1024
}