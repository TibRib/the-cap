You need to download the yolov4.weigths trained datasets.

run the download_dataset.sh script to download it automatically

Otherwise, get it from here and put it in the folder (CPU or CUDA) you want  to deploy the image from:
https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights

Testing (CPU) : 
1-  Go into the CPU folder
2- paste the yolov4.weights in this folder (or install it using the script provided)
3- run docker build . -t yolo:0.1
4- wait until all the installation is done
5- run a graphic test:
   On linux: 
       $ docker run --name yoloTest -it -e DISPLAY=$DISPLAY --rm yolo:0.1 ./darknet detect cfg/yolov4.cfg yolov4.weights data/dog.jpg
  On windows:
       1- You need to set up a virtual display server using xming
       2- check your ethernet ip using ipconfig in cmd 
       3- launch xming (xlaunch) onto the display id 0
       $ docker run --name yoloTest -it -e DISPLAY=YOUR_IP:0.0 --rm yolo:0.1 ./darknet detect cfg/yolov4.cfg yolov4.weights data/dog.jpg

