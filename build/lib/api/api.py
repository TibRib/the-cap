import flask
from ranking import tools, athlete
from flask import request, jsonify


app = flask.Flask(__name__)
app.config["DEBUG"] = True

csv_path = 'ranking/Rankings.csv'

# Create some test data for our catalog in the form of a list of dictionaries.
athletes = tools.fromCSVtoJSON(csv_path)


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/athletes/all', methods=['GET'])
def api_all():
    return jsonify(athletes)

# http://localhost:5000/api/predict/elo/?A_name=Novak_Djokovic&B_name=Rafael_Nadal
@app.route("/api/predict/elo/")
def outcome():
    athA_name = request.args.get("A_name")
    athB_name = request.args.get("B_name")
    A = tools.initAthleteFromCSV(csv_path, athA_name)
    B = tools.initAthleteFromCSV(csv_path, athB_name)
    A_win = A.chanceOfWinning(B)
    B_win = B.chanceOfWinning(A)
    json = {'prediction':{'A_winner':A_win, 'B_winner':B_win}}
    return json





app.run()
