import cv2
import numpy as np


class DetectionZone:
    def __init__(self, toggle_objects, aabb):
        self.toggle_objects = toggle_objects
        self.aabb = aabb
        #randomize the zone display color at init
        self.color = tuple(np.random.randint(256, size=3))
    
    def draw_cv2(self,img):
        cv2.rectangle(img,
         self.aabb.start_point(), 
         self.aabb.end_point(), 
         self.color, 
         thickness=2
        )
    
    def checkInside(self, class_name, point) -> bool:
        if class_name != self.toggle_objects:
            return False
        start, end = self.aabb.start_point(), self.aabb.end_point()
        if start.x <= point.x <= end.x:
           if start.y <= point.y <= end.y:
               return True
        return False
                
class Vector2:
    x = 0
    y = 0

class AABB:
    def __init__(self, x1,x2,y1,y2):
        self.position = Vector2(x1,y1)
        self.size = Vector2(abs(x2-x1),abs(y2-y1))

    def start_point(self) -> Vector2:
        return self.position
    def end_point(self) -> Vector2:
        return self.position+self.size