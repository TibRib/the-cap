import json
from sql.sql import JSONify, getAllMatchesFromAthlete, getAllMatchesFromStartDate
import flask
import os 

from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Getting data from SQLite</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# http://localhost:5000/api/info/match/name/?name=novak_djokovic&limit=10
@app.route("/api/info/match/name/",  methods=['GET'])
def matches_name():
    ath_name = request.args.get("name")
    limit = request.args.get("limit")
    json_list = []
    if limit == None:
        rows = getAllMatchesFromAthlete(str(ath_name))
    else:
        rows = getAllMatchesFromAthlete(str(ath_name), limit=limit)

    for row in rows:
        json_list.append(JSONify(row))

    return jsonify(json_list)

# http://localhost:5000/api/info/match/date/?year=2020&month=07&day=01&limit=10
@app.route("/api/info/match/date/",  methods=['GET'])
def matches_date():
    year = None if request.args.get("year") == None else int(request.args.get("year"))
    month = None if request.args.get("month") == None else int(request.args.get("month"))
    day = None if request.args.get("day") == None else int(request.args.get("day"))
    limit = request.args.get("limit")


    json_list = []
    #if we have everything
    if year != None and month != None and day != None:
        rows = getAllMatchesFromStartDate(year=year, month=month, day=day, limit=limit)
    #if we miss only year 
    elif year == None and month != None and day != None: 
        rows = getAllMatchesFromStartDate(month=month, day=day, limit=limit)
    #if we have only year
    elif year != None and month == None and day == None: 
        rows = getAllMatchesFromStartDate(year=year, limit=limit)
    #if we miss only month
    elif year != None and month == None and day != None: 
        rows = getAllMatchesFromStartDate(year=year, day=day, limit=limit)
    #if we have only month
    elif year == None and month != None and day == None: 
        rows = getAllMatchesFromStartDate(month=month, limit=limit)
    #if we miss only day
    elif year != None and month != None and day == None: 
        rows = getAllMatchesFromStartDate(year=year, month=month, limit=limit)
    #if we have only day
    elif year == None and month == None and day != None: 
        rows = getAllMatchesFromStartDate(day=day, limit=limit)
    else:
        rows = getAllMatchesFromStartDate(limit=limit)

    for row in rows:
        json_list.append(JSONify(row))

    return jsonify(json_list)

app.run()#host="0.0.0.0", port=80)