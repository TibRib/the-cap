from __future__ import division, print_function, absolute_import

from timeit import time
import warnings
import cv2
import numpy as np
from PIL import Image
from yolo import YOLO

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

def main(yolo):
    max_cosine_distance = 0.5
    nn_budget = None
    nms_max_overlap = 0.8

    #Deep SORT properties:
    model_filename = 'model_data/mars-small128.pb'
    encoder = gdet.create_box_encoder(model_filename, batch_size=1)
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", max_cosine_distance, nn_budget)
    tracker = Tracker(metric)

    #OpenCV properties + video input
    tracking = True
    writeVideo_flag = True
    asyncVideo_flag = False

    file_path = "https://storage.googleapis.com/the-cap-bucket/Maria_Sharapova_Vs_Caroline_Wozniacki_3.mp4"

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

    counter = []

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


        cmap = plt.get_cmap('tab20b')
        colors = [cmap(i)[:3] for i in np.linspace(0,1,20)]

        current_count = int(0)

        
        if tracking:
            tracker.predict()
            tracker.update(detections)

            for track in tracker.tracks:
                if not track.is_confirmed() or track.time_since_update >1:
                    continue
                
                color = colors[int(track.track_id) % len(colors)]
                color = [i * 255 for i in color]
                bbox = track.to_tlbr()
                class_name= "obj"
                #score = "%.2f" % round(det.confidence * 100, 2) + "%"
                cv2.rectangle(img, (int(bbox[0]),int(bbox[1])), (int(bbox[2]),int(bbox[3])), color, 2)
                cv2.rectangle(img, (int(bbox[0]), int(bbox[1]-30)), (int(bbox[0])+(len(class_name)
                            +len(str(track.track_id))+1)*17, int(bbox[1])), color, -1)
                cv2.putText(img, class_name+"-"+str(track.track_id), (int(bbox[0]), int(bbox[1]-10)), 0, 0.75,
                            (255, 255, 255), 2)

                center = (int(((bbox[0]) + (bbox[2]))/2), int(((bbox[1])+(bbox[3]))/2))
                pts[track.track_id].append(center)

                for j in range(1, len(pts[track.track_id])):
                    if pts[track.track_id][j-1] is None or pts[track.track_id][j] is None:
                        continue
                    thickness = int( max(1, 8*(j/len(pts[track.track_id]))))
                    cv2.line(img, (pts[track.track_id][j-1]), (pts[track.track_id][j]), color, thickness)
        else:
            for det in detections:
                bbox = det.to_tlbr()
                #score = "%.2f" % round(det.confidence * 100, 2) + "%"
                cv2.rectangle(img, (int(bbox[0]),int(bbox[1])), (int(bbox[2]),int(bbox[3])), (0, 200, 0), 2)
                if len(classes) > 0: #Display the class name
                    class_name= str(det.cls)
                    cv2.rectangle(img, (int(bbox[0]), int(bbox[1]-30)), (int(bbox[0])+(len(class_name)*17), int(bbox[1])), (0, 200, 0), -1)
                    cv2.putText(img, class_name, (int(bbox[0]), int(bbox[1]-10)), 0, 0.75,(255, 255, 255), 2)


        total_count = len(set(counter))
        #cv2.putText(img, "Joueurs dans la zone: " + str(current_count), (0, 80), 0, 1, (0, 0, 255), 2)

        fps = 1./(time.time()-t1)
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
    main(YOLO())