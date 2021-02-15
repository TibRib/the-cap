package main

import(
	"os"
	"image"
	"image/color"
	"image/png"
	"strconv"
)

func initImage(width int, height int, whiten bool) *image.RGBA {
	upLeft := image.Point{0, 0}
	lowRight := image.Point{width, height}

	img := image.NewRGBA(image.Rectangle{upLeft, lowRight})
	
	if(whiten == true){
		col := color.RGBA{200, 200, 200, 0xff}

		// Set white color for each pixel.
		for x := 0; x < width; x++ {
			for y := 0; y < height; y++ {
				img.Set(x, y, col)
			}
		}
	}
	return img
}

func writeImage(img* image.RGBA, filename string){
	// Encode as PNG.
	f, _ := os.Create(filename)
	png.Encode(f, img)
}

func addMarkerOnPosition(xt int, yt int, img *image.RGBA ){
	width := 10
	col := color.RGBA{255, 0, 0, 0xff}
	large := 5
	
	for l := int( - large/2); l < int((large+1)/2); l++{
		x := xt+l
		y := yt
		for i := 0; i <= width; i++ {
			(*img).Set(x+i-(width/2), y-(width/2)+i , col)
			(*img).Set(x+i-(width/2), y+(width/2)-i , col)
		}
	}
}

func addVectorOnPosition(x1 int, y1 int, x2 int, y2 int, img *image.RGBA){
	if(x2-x1 == 0){ return }
	slope := (y2 - y1) / (x2 - x1);
	if(slope == 0){ return }
	col := color.RGBA{0, 0, 255, 0xff}

	for x := x1; x <= x2; x++ {
		y := slope * (x - x1) + y1
		(*img).Set(x, y, col)
	}
}

func writeObjsPos(objects []Position, vectors []Vector2, frameId int){
	width := 256
	height := 144
	img := initImage(width,height, true)
	for i,obj := range objects{
		objx := int(obj.x*float64(width))
		objy := int(obj.y*float64(height))
		addMarkerOnPosition( objx, objy, img)
		addVectorOnPosition( objx, objy, objx+int(vectors[i].x*float64(width)), objy+int(vectors[i].y*float64(height)), img)
	}

	path, err := os.Getwd()
	if err != nil {
		println("no cwd")
	}
	writeImage(img,  path+"/images/"+strconv.Itoa(frameId)+".png")
}