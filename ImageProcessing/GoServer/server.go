package main

import (
	"encoding/json"
	"net/http"
)

type Data struct {
	Name    string `json:"name"`
	Surname string `json:"surname"`
	PosX    int    `json:"pos_x"`
	PosY    int    `json:"pos_y"`
}

//Data mocking used for providing the latter structured response
func mockupData() Data {
	var data Data = Data{
		Name:    "Test",
		Surname: "TestSurname",
		PosX:    20,
		PosY:    40,
	}
	return data
}

func requestHandler(w http.ResponseWriter, r *http.Request) {
	//Retrieve data from a function
	var data Data = mockupData()
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

func main() {
	http.HandleFunc("/request", requestHandler)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
