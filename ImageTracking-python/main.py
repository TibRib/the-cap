from typing import List

from fastapi import FastAPI
from pydantic import BaseModel
import asyncio
from my_detector import *
import uvicorn
from threading import Thread
app = FastAPI()

class Input(BaseModel):
    media_url: str

class Media(BaseModel):
    url: str
    duration: int = 0

class Deduction(BaseModel):
    frame_id: int
    text: str

class Response(BaseModel):
    media: Media
    frames_processed: int = 0
    deductions : List[Deduction] = []

_status = "waiting"
_deductions = [
    Deduction(frame_id=0,text="Hello world")
    ]

@app.get("/")
def read_status():
    global _status
    return {"status" : _status}

@app.get("/results", response_model=Response)
def read_deductions():
    global _deductions
    return Response(
            media=Media(url=""),
            deductions= _deductions
        )


@app.post("/")
async def launch_process(input : Input):
    if(_status != "processing"):
        try:
            return {"information" : "started processing"}
        finally:
            run_detector(input.media_url, asyncVideo_flag=False, tracking=True, writeVideo_flag=False)

    return {"information" : "Error : Already working on a footage"}

def update_status(state):
    global _status
    _status = state

def main():
    uvicorn.run("main:app", port=8080, reload=False, access_log=False)

if __name__ == '__main__':
    main()