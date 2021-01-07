# CHOOSE A BUILDING MODE : can be either 'cpu' or 'gpu'
# cpu : DEFAULT : compatibility mode, best suited for one image analysis
# gpu : cuda accelerated (Windows+Docker Insider WSL2/ Linux with CUDA running), best for video analysis (25 FPS)
ARG mode=cpu

# -- BASE BUILD -- #
# Get Nvidia CUDA developper ubuntu image
FROM nvidia/cuda:10.2-cudnn7-devel-ubuntu18.04 AS base
ENV DEBIAN_FRONTEND noninteractive
# Install OPENCV dependencies
RUN apt-get update && apt-get install -y git pkg-config libopencv-dev wget
# Add stable cuda developper library
RUN apt-get install -y libcuda1-340
## GO language Installation
RUN mkdir /root/downloads && cd /root/downloads
RUN wget https://golang.org/dl/go1.15.6.linux-amd64.tar.gz
RUN sha256sum go1.15.6.linux-amd64.tar.gz
RUN tar xvf go1.15.6.linux-amd64.tar.gz
RUN chown -R root:root ./go
RUN mv go /usr/local
RUN mkdir /root/gowork
ENV PATH "$PATH:/usr/local/go/bin"
# Clone Darknet Image Recognition Repo in our container
RUN cd /root && git clone https://github.com/TibRib/darknet && cd darknet
#COPY darknet /root/darknet
WORKDIR /root/darknet

# -- CPU = DEFAULT BUILD [Inherits BASE] -- #
FROM base AS cpu-version
RUN sed -i 's/AVX=0/AVX=1/; s/OPENMP=0/OPENMP=1/; s/OPENCV=0/OPENCV=1/' Makefile
ENV VERSION=CPU

# -- GPU = CUDA SPECIFIC BUILD [Inherits CPU] -- #
FROM cpu-version AS gpu-version
RUN sed -i 's/GPU=0/GPU=1/; s/CUDNN=0/CUDNN=1/' Makefile
ENV VERSION=GPU

# -- FINAL BUILD [executed after specific instructions] -- #
FROM ${mode}-version AS final
RUN echo "VERSION is set to ${VERSION}"
COPY yolov4.weights /root/darknet/yolov4.weights
# Compile Darknet with GCC
RUN make
# Error inducing lib file removal
RUN rm /usr/lib/x86_64-linux-gnu/libcuda.so.1

# Copy the server app local sources
COPY API_server /root/darknet/API_server
# Move to the server
WORKDIR /root/darknet/API_server
# Download Go dependencies.
RUN go mod download
# Build the Go server app
RUN go build -o server .

# Expose port 8080 to the host
EXPOSE 8080
EXPOSE 8070
# Command to run the server
CMD ["./server"]

#Go back to darknet (debugging)
WORKDIR /root/darknet