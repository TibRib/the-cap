FROM nvidia/cuda:10.2-cudnn7-devel-ubuntu18.04
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y git pkg-config libopencv-dev
RUN apt-get install -y libcuda1-340
RUN cd /root && git clone https://github.com/AlexeyAB/darknet && cd darknet && sed -i 's/GPU=0/GPU=1/; s/CUDNN=0/CUDNN=1/; s/OPENCV=0/OPENCV=1/' Makefile && make && ls
WORKDIR /root/darknet
COPY yolov4.weights /root/darknet/yolov4.weights