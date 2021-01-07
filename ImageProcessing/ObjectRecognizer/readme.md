# ObjectObserver micro-service - GUIDE

### About this micro-service
The **Object observer** micro-service has as a goal to observe a video or image file frame by frame and to output a json formatted response whenever it is called.
This GUIDE is purely about debugging, and not forgetting how to launch properly the images.

**I sincerely recommend using Ubuntu for deploying this build.**

## Versions -- How to build
There are two versions of the image, embedded as layers into the one big **Dockerfile**.
- **CPU** : DEFAULT version, use it if you either do not have a linux installation with nvidia containers runtime or if you use a classic windows installation
- **GPU** : Required for Video processing. *Oh boy this one is complicated...*
### GPU Version requirements
**Required** : an NVIDIA Graphics Card

**Linux (Ubuntu) environment** : 

You need Docker, and the nvidia containers runtime dependencies 
*(Just execute the following long command to install all of the dependencies)*

    curl -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | sudo apt-key add - && distribution=$(. /etc/os-release;echo $ID$VERSION_ID) && curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.list |    sudo tee /etc/apt/sources.list.d/nvidia-container-runtime.list && sudo apt-get update && sudo apt-get install nvidia-container-runtime

**Windows environment** : ***[Warning: For advanced users only!]***

Running CUDA applications under containers under WSL2 backend is theoritically not supported. But as of this update, the Docker team has made it available in one of its beta builds (Dec. 21 2020) https://www.docker.com/blog/wsl-2-gpu-support-is-here/
So, in order for you to run the gpu processing on Windows, you will need:

 - To subscribe to the [Windows Insider Program](https://insider.windows.com/fr-fr/) with your Microsoft account.
 - To enable maximum Telemetry on your system.
 - To upgrade your Windows version to the latest Insider Preview from the **developper channel** (or at least superior or equal to **20150**, [in which they added GPU support for WSL2](https://blogs.windows.com/windows-insider/2020/06/17/announcing-windows-10-insider-preview-build-20150/) )
 - To download this [Docker Desktop Technical Preview](https://desktop.docker.com/win/preview/50723/Docker%20Desktop%20Installer.exe) (beta).
 - To subscribe to Nvidia's developper program and download their [WSL CUDA drivers](https://developer.nvidia.com/cuda/wsl).
 -  *I've stole their cuda drivers link, you can get them from* [here](https://developer.nvidia.com/46521-gameready-win10-dch-64bit-international).
 - To make sure WSL2 is enabled as the Docker Back-end engine.
 
 ## Building the image
 You made it there ! You can now build the image:
 Before you just need to [download this dataset](https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights) and put it next to the **Dockerfile**.
 
 - CPU mode building : 
	 - `docker build . -t yolo:0.1`
 - GPU mode building :
	 - `docker build --build-arg mode=gpu . -t yolo:0.1`

The building process shall start, time for a ☕ break.
If you are interested on what the Dockerfile does, i can quickly explain:

 1. Download the [nvidia/cuda:10.2-cudnn7-devel-ubuntu18.04](https://hub.docker.com/layers/nvidia/cuda/10.2-cudnn7-devel-ubuntu18.04/images/sha256-50a61a748219dc835f5a80373f9fb1eb73efa846b18b3c50945ba7c44e88d107?context=explore)
 2. Make sure to get the cuda developper library installed
 3. clone darknet (image recognition algorithm) from [this](https://github.com/TibRib/darknet) repository (my fork of AlexeyAB's darknet)
 4. Adapt the makefile to the version you chose (cpu/gpu)
 5. Compile the darknet sources
 6. Copy the .weights files provided*
 7. Install the GO language
 8. Run the GO REST API server.
 
# How to use Darknet with the container
If you want to display your results and and look at the detected objects on screen, you will need to set-up a display server on your host system. I'll explain the steps.

## Linux usage
**NECESSARY :  RUN VIRTUAL DISPLAY**

    sudo xhost +
That's all you need for running a virtual display server.

**RUN WEBCAM DARKNET LIVE DEMO:**
This command allows you to run the recognition in real time on your webcam, -if you have one.

    docker run --name yolo -it -e DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix --device /dev/video0 --gpus all --rm yolo:0.1 ./darknet detector demo cfg/coco.data cfg/yolov4.cfg yolov4.weights -c 0


**RUN SINGLE IMAGE DETECTION**

With CPU mode containers : 
    
    docker run --name yolo -it -e DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix --rm yolo:0.1 ./darknet detect cfg/yolov4.cfg yolov4.weights data/dog.jpg

With GPU mode containers : 
    
    docker run --name yolo -it --gpus all -e DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix --rm yolo:0.1 ./darknet detect cfg/yolov4.cfg yolov4.weights data/dog.jpg


**RUN VIDEO DARKNET DEMO:** ⚠️ -- Requires GPU version  -- ⚠️

This command allows you to run the recognition in real time on a local video footage

    docker run --name yolo -it -e DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix --gpus all --rm yolo:0.1  ./darknet detector demo cfg/coco.data cfg/yolov4.cfg yolov4.weights -ext_output MY_FOOTAGE.mp4

**RUN ONLINE VIDEO DARKNET DEMO:** ⚠️ -- Requires GPU version  -- ⚠️


    docker run --name yolo -it -e DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix --gpus all --rm yolo:0.1 ./darknet detector demo cfg/coco.data cfg/yolov4.cfg yolov4.weights MY_VIDEO_DIRECT_URL -i 0

## Windows usage
Firstly, you need  a display server. I recommend using XLaunch (XMing). Download it here : https://sourceforge.net/projects/xming/
After installation, look for XLaunch and run it.

 1.  Choose the `Display number : 0` and the `Multiple Windows` option.
 2. Check the  `Start no client` radio button 
 3. Tick the `☑️ Clipboard` and `☑️No Access Control`
 4. Hit `Finish` to start the virtual display server (will run in background).

Now that you have the virtual display server running,  you can start hacking with darknet 😉 

### How to know my virtual display ip ? 
in CMD, run `ipconfig`, look for the WSL vEthernet adapter:
```
Carte Ethernet vEthernet (WSL) :

   Suffixe DNS propre à la connexion. . . :
   Adresse IPv6 de liaison locale. . . . .: fe80::3ced:80c1:cd70:3d99%49
   Adresse IPv4. . . . . . . . . . . . . .: 172.30.16.1
   Masque de sous-réseau. . . . . . . . . : 255.255.240.0
   Passerelle par défaut. . . . . . . . . :

``` 
Here my IP is **172.30.16.1**, do the same with your setup. and write down this IP. (Will be described as MY_IP in the following commands).

**RUN SINGLE IMAGE DETECTION**

With CPU mode containers : 
    
    docker run --name yoloTest -it -e DISPLAY=MY_IP:0.0 --rm yolo:0.1 ./darknet detect cfg/yolov4.cfg yolov4.weights data/dog.jpg

With GPU mode containers : 
    
    docker run --gpus all --name yoloTest -it -e DISPLAY=MY_IP:0.0 --rm yolo:0.1 ./darknet detect cfg/yolov4.cfg yolov4.weights data/dog.jpg


**RUN VIDEO DARKNET DEMO:** ⚠️ -- Requires GPU version  -- ⚠️

    docker run --name yolo -it -e DISPLAY=MY_IP:0.0 --gpus all --rm yolo:0.1 ./darknet detector demo cfg/coco.data cfg/yolov4.cfg yolov4.weights -ext_output MY_VIDEO.mp4

**RUN ONLINE VIDEO DARKNET DEMO:** ⚠️ -- Requires GPU version  -- ⚠️

Try with a video such as https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4
*Tested with mp4, avi files*.

    docker run --name yolo -it -e DISPLAY=MY_IP:0.0 --gpus all --rm yolo:0.1 ./darknet detector demo cfg/coco.data cfg/yolov4.cfg yolov4.weights MY_VIDEO_URL -i 0

### Experimental : 

Run onlide video darknet demo with JSON output as a stream on port 8070:

    docker run --name yolo -p 127.0.0.1:8070:8070 -it -e DISPLAY=MY_IP:0.0 --gpus all --rm yologpu:0.1 ./darknet detector demo cfg/coco.data cfg/yolov4.cfg yolov4.weights MY_VIDEO_URL -i 0 -json_port 8070


