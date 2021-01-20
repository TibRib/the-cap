import flask
from flask import redirect, request, jsonify, render_template
import os
import base64

app = flask.Flask(__name__, template_folder='template')
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
    <p>A prototype API for distant reading of science fiction novels.</p>'''


@app.route('/post/<filename>', methods=['GET', 'POST'])
def result(filename):
    file = base64.b64decode(filename).decode('utf-8')
    os.system("./bin/flite '" + file + "' audio.wav")
    return redirect("http://0.0.0.0:9990/get/")


@app.route('/get/', methods=['GET'])
def returnFile():
    if os.path.exists('audio.wav'):
        enc = base64.b64encode(open("audio.wav", 'rb').read())
        return enc
    else:
        return "Oops, looks like the file has not been created, try again !"


app.run(host='0.0.0.0', port=9990)
