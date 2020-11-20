#!/bin/bash
echo -n "enter 1 for downloading the files in CPU, enter 2 for downloading the files in GPU(Nvidia CUDA)"
read input



case $input in
    1)
        echo -n "You picked CPU downloading"
        cd CPU_YOLOv4
        wget "https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights"
        ;;
    2)
        echo -n "You picked GPU(CUDA) downloading"
        cd CUDA_YOLOv4
        wget "https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights"
        ;;
    *)
    echo "Please enter a valid input"
    ;;
 esac