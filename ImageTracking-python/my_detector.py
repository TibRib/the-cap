from __future__ import division, print_function, absolute_import

from timeit import time
import warnings
import cv2
import numpy as np
from PIL import Image
from numpy.core.fromnumeric import size
from yolo import YOLO
from custom.zones import DetectionZone, AABB, Vector2

import os
ROOT = os.path.dirname(os.path.abspath(__file__))

import matplotlib.pyplot as plt

from deep_sort import preprocessing
from deep_sort import nn_matching
from deep_sort.detection import Detection
from deep_sort.detection_yolo import Detection_YOLO
from deep_sort.tracker import Tracker
from tools import generate_detections as gdet
import imutils.video
from videocaptureasync import VideoCaptureAsync
warnings.filterwarnings('ignore')

import jsonstreams

def appendToFile(info):
    f = open("result/output.txt", "a") #Open the file in append mode
    f.write(info+"\n")
    f.close()
    return

def writeToFile(info):
    f = open("result/output.txt", "w") #Open the file in append mode
    f.write(info+"\n")
    f.close()
    return

zones = []
ix,iy = -1,-1

def drawZone(event,x,y,flags,param):
    global ix,iy,zones
    if event == cv2.EVENT_LBUTTONDOWN:
        ix,iy = x,y
    elif event == cv2.EVENT_LBUTTONUP:
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        newz = DetectionZone("person", AABB( ix, iy, x, y))
        zones.append( newz )
        print(newz.aabb)

def main(yolo):
    global zones
    max_cosine_distance = 0.3
    nn_budget = None
    nms_max_overlap = 1.0

    #Deep SORT properties:
    model_filename = 'model_data/mars-small128.pb'
    encoder = gdet.create_box_encoder(model_filename, batch_size=1)
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", max_cosine_distance, nn_budget)
    tracker = Tracker(metric)

    #OpenCV properties + video input
    tracking = True
    writeVideo_flag = True
    asyncVideo_flag = False

    #file_path = "http://46.151.101.149:8081/?action=stream"
    
    file_path = "data/match.mp4"

    writeToFile(file_path)

    if asyncVideo_flag : #Real time aynchronous frame tracking
        vid = VideoCaptureAsync(file_path)
    else: #Classic FPS
        vid = cv2.VideoCapture(file_path)

    if asyncVideo_flag:
        vid.start()

    if asyncVideo_flag:
        vid_width = int(vid.cap.get(3))
        vid_height = int(vid.cap.get(4))
    else:
        vid_width = int(vid.get(3))
        vid_height = int(vid.get(4))

    vid_fps =int(vid.get(cv2.CAP_PROP_FPS))

    if writeVideo_flag:
        codec = cv2.VideoWriter_fourcc(*'DIVX')
        out = cv2.VideoWriter('output_yolov4.avi', codec, vid_fps, (vid_width, vid_height))
        frame_index = -1

    from _collections import deque
    pts = [deque(maxlen=50) for _ in range(1000)]

    zones = [
        DetectionZone("person",AABB(vid_width/3,2*vid_height/3,3*vid_width/6,3*vid_height/6)),
        DetectionZone("person",AABB(700,500, 900, 300))
    ]
    cv2.namedWindow('output')
    cv2.setMouseCallback('output',drawZone)
    
    while True: #detections loop
        ret, img = vid.read()
        if ret != True:
            print('Completed')
            break

        t1 = time.time()

        image = Image.fromarray(img[...,::-1])  # bgr to rgb

        boxes, confidence, classes = yolo.detect_image(image)

        #tracking by default
        if tracking:
            features = encoder(img, boxes)
            detections = [Detection(bbox, confidence, cls, feature) for bbox, confidence, cls, feature in
                            zip(boxes, confidence, classes, features)]
        else:
            detections = [Detection_YOLO(bbox, confidence, cls) for bbox, confidence, cls in
                            zip(boxes, confidence, classes)]

         # Run non-maxima suppression.
        boxes = np.array([d.tlwh for d in detections])
        scores = np.array([d.confidence for d in detections])
        indices = preprocessing.non_max_suppression(boxes, nms_max_overlap, scores)
        detections = [detections[i] for i in indices]

        for det in detections:
            bbox = det.to_tlbr()
            #score = "%.2f" % round(det.confidence * 100, 2) + "%"
            cv2.rectangle(img, (int(bbox[0]),int(bbox[1])), (int(bbox[2]),int(bbox[3])), (0, 200, 0), 2)
            if len(classes) > 0: #Display the class name
                class_name= str(det.cls)
                cv2.rectangle(img, (int(bbox[0]), int(bbox[1]-30)), (int(bbox[0])+(len(class_name)*17), int(bbox[1])), (0, 200, 0), -1)
                cv2.putText(img, class_name, (int(bbox[0]), int(bbox[1]-10)), 0, 0.75,(255, 255, 255), 2)

        if tracking:
            tracker.predict()
            tracker.update(detections)

            for zone in zones:
                zone.draw_cv2(img)

            for track in tracker.tracks:
                if not track.is_confirmed() or track.time_since_update >1:
                    continue

                bbox = track.to_tlbr()
                
                cv2.putText(img, str(track.track_id), (int(bbox[0]+20), int(bbox[1]-10)), 0, 0.75,(0,0,0), 2)

                center = (int(((bbox[0]) + (bbox[2]))/2), int(((bbox[1])+(bbox[3]))/2))
                pts[track.track_id].append(center)

                for j in range(1, len(pts[track.track_id])):
                    if pts[track.track_id][j-1] is None or pts[track.track_id][j] is None:
                        continue
                    thickness = int( max(1, 8*(j/len(pts[track.track_id]))))
                    cv2.line(img, (pts[track.track_id][j-1]), (pts[track.track_id][j]), (0,0,200), thickness)

                centerV = Vector2(center[0],center[1])
                for i,zone in enumerate(zones):
                    if zone.checkInside("person",centerV):
                        if not zone.knows(track.track_id):
                            appendToFile("person "+str(int(track.track_id))+" entered zone "+str(i))
                            zone.add(track.track_id)
                    elif zone.knows(track.track_id):
                        appendToFile("person "+str(int(track.track_id))+" left zone "+str(i))
                        zone.remove(track.track_id)
                            

        for i,zone in enumerate(zones):
            cv2.putText(img, "Persons in zone "+str(i)+" : "+str(zone.count()), (0, 80+ 40*i), 0, 1, (0, 0, 255), 2)


        fps = 1./(time.time()-t1)
        print(len(zones))
        if asyncVideo_flag:
            cv2.putText(img, "Async FPS: {:.2f}".format(fps), (0,30), 0, 1, (0,0,255), 2)
        else:
            cv2.putText(img, "FPS: {:.2f}".format(fps), (0,30), 0, 1, (0,0,255), 2)

        cv2.imshow('output', img)
        
        if writeVideo_flag: # and not asyncVideo_flag:
            # save a frame
            out.write(img)
            frame_index = frame_index + 1
        
        # Press Q to stop!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    if asyncVideo_flag:
        vid.stop()
    else:
        vid.release()

    if writeVideo_flag:
        out.release()

    cv2.destroyAllWindows()

if __name__ == '__main__':
    np.random.seed(int(time.time()))
    main(YOLO())



#with jsonstreams.Stream(jsonstreams.Type.object, filename='foo') as s:
#    s.write('foo', 'bar')
#    with s.subobject('a') as a:
#        a.write(1, 'foo')
#        a.write(2, 'bar')
#    s.write('bar', 'foo')
