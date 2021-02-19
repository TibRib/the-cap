from __future__ import annotations

import cv2
import numpy as np


class DetectionZone:
    def __init__(self, toggle_objects, aabb):
        self.toggle_objects = toggle_objects
        self.aabb = aabb
        #randomize the zone display color at init
        self.color = (np.random.randint(256),np.random.randint(256),np.random.randint(256))
        self.objects = set()
        print(self.color)
    
    def draw_cv2(self,img):
        cv2.rectangle(img,
        i_tuple(self.aabb.start_point()), 
        i_tuple(self.aabb.end_point()), 
        self.color, 
        4
        )
    
    def checkInside(self, class_name, point) -> bool:
        if class_name != self.toggle_objects:
            return False
        start, end = self.aabb.start_point(), self.aabb.end_point()
        if start.x <= point.x <= end.x:
           if start.y <= point.y <= end.y:
               return True
        return False
    
    def knows(self, value) -> bool:
        return (value in self.objects) # returns a boolean
    
    def count(self) -> int:
        return len(self.objects)
    
    def add(self, value):
        self.objects.add(value)
    
    def remove(self, value):
        self.objects.discard(value)

def i_tuple(a : Vector2):
    return (int(a.x),int(a.y))

class Vector2:
    def __init__(self, x,y):
        self.x = x
        self.y = y

    def __add__(self:Vector2, other:Vector2) -> Vector2:
       return Vector2(self.x + other.x, self.y + other.y)

    def __sub__(self:Vector2, other:Vector2) -> Vector2:
       return Vector2(self.x - other.x, self.y - other.y)

    def __eq__(self:Vector2, other:Vector2) -> bool:
        if self.x == other.x and self.y == other.y:
            return True
        return False

    def __str__(self) -> str:
        return "("+str(self.x)+", "+str(self.y)+")"

class AABB:
    def __init__(self, x1,y1,x2,y2):
        self.position = Vector2(x1,y1)
        self.size = Vector2(abs(x2-x1),abs(y2-y1))

    def start_point(self) -> Vector2:
        return self.position
    def end_point(self) -> Vector2:
        return self.position+self.size
    def __str__(self) -> str:
        return "pos:"+str(self.position)+", size:"+str(self.size)