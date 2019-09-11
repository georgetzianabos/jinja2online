import os

from flask import (
  Flask,
  request,
  jsonify,
  send_from_directory,
  Response
)

from api import process
import api.example

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 300

@app.route('/')
def home():
    return send_from_directory(os.path.abspath('static/'), 'index.html')

@app.route('/api')
def working():
    return jsonify({'status': 'working'})

@app.route('/api/process', methods=['POST'])
def process_request():
    
    def get_args():
        
        content = request.json
        
        template = content['template']
        values = content['values']
        
        if (type(template) is not str or type(values) is not dict):
            raise Exception()
        
        return template, values
    
    try:
        args = get_args()
    except Exception:
        return jsonify({"error" : "Bad Request"}), 400
        
    try:
        
        result = { "result": process(*args) }
            
    except Exception as e:
      
        return jsonify({"error": e.args[0]}), 400
    
    return jsonify(result)
  
@app.route('/api/example')
def get_example():
  
    example = api.example.get_example()
  
    return jsonify(example)
