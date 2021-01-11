import flask
from flask import request, jsonify, render_template
import os
import base64


app = flask.Flask(__name__, template_folder='template')
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
    <p>A prototype API for distant reading of science fiction novels.</p>'''

@app.route('/post/', methods=['GET','POST'])
def result():
    if request.method == 'POST':
        try:
            os.system("./bin/flite '" + request.form["towav"] + "' audio.wav")
            return '''<h1>Ready to hear your voice?</h1>
            <p>Navigate to the /get section to view the base64 file</p>'''
        except ValueError:
            return "Oops something went wrong"
    elif request.method == 'GET': 
        return render_template("index.html")
    


@app.route('/get/', methods=['GET'])
def returnFile():
    if os.path.exists('audio.wav'):
        enc=base64.b64encode(open("audio.wav", 'rb').read())
        return enc;
    else:
        return "Oops, looks like the file has not been created, try again !"


app.run(host='0.0.0.0',port=9990)
