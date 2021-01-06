import flask
from ranking import tools
from flask import request, jsonify


app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.
athletes = tools.fromCSVtoJSON('/home/azarog/Documents/the-cap/ranking/Rankings.csv')


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/athletes/all', methods=['GET'])
def api_all():
    return jsonify(athletes)

app.run()
