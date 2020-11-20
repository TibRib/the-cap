FROM nvidia/cuda:10.2-cudnn7-devel-ubuntu18.04
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y git pkg-config libopencv-dev
RUN cd /root && git clone https://github.com/AlexeyAB/darknet && cd darknet && wget https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights ./yolov4.weights && sed -i 's/GPU=0/GPU=1/; s/CUDNN=0/CUDNN=1/; s/OPENCV=0/OPENCV=1/' Makefile && make
WORKDIR /root/darknet