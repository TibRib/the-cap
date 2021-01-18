package main

import (
	"strconv"
)

/********* REAL DEDUCTION FUNCTIONS *************/
func deductFrame(input DarknetData) FrameDeduction {
	var str string = strconv.Itoa(input.FrameID)+" - I see "
	for _, obj := range input.Objects{
		str+= obj.Name+", "
	}
	deduct := FrameDeduction{ FrameID : input.FrameID, Text: str }
	return deduct
}
