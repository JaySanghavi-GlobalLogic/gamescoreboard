from flask import Flask, request
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from threading import Lock
import time
from mock_data import mock_scoreboard_data, mock_throughput_lines,mock_unitsdata, generate_mock_scoreboard,generate_mock_throughput,generate_mock_unitsdata

app = Flask(__name__)
CORS(app)

# --- WebSocket Setup ---
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*")

# --- RESTX API Setup ---
api = Api(app, version="1.0", title="Scoreboard API", description="Live Scoreboard Dashboard", doc="/swagger/")
ns = api.namespace('Scoreboard', description='Scoreboard operations')


import unitsdata as unitsdata  # noqa: F401

# --- Models ---
row_model = api.model('Row', {
    'location': fields.List(fields.String),
    'oee': fields.Integer,
    'start': fields.Integer,
    'rampUp': fields.Integer,
    'pwrHr': fields.Integer,
    'pwrHrSign': fields.String,
    'counts': fields.List(fields.Integer),
    'huddles': fields.Integer,
    'skus': fields.Integer,
    'avgCO': fields.String,
    'points': fields.Integer,
    'helmetColor': fields.String
})

scoreboard_model = api.model('Scoreboard', {
    'headers': fields.List(fields.String),
    'scoreId': fields.String,
    'rows': fields.List(fields.Nested(row_model)),
    'scoreboardOptions': fields.List(fields.String)
})


thread = None
thread_lock = Lock()

def background_thread():
    """Function that runs in the background and emits data every 5 seconds."""
    while True:
        time.sleep(5)

        # You can update mock data here before emitting if needed
        # For example: increment some counts, or simulate changes

        socketio.emit('scoreboard_update', generate_mock_scoreboard())
        socketio.emit('throughput_update', generate_mock_throughput())
        socketio.emit('units_update', generate_mock_unitsdata())


# --- SocketIO Events ---

@socketio.on('connect')
def on_connect():
    global thread
    print("Client connected")

    # Start the background thread only once
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(target=background_thread)

    # Send immediate data on connect
    emit('scoreboard_update', mock_scoreboard_data)
    emit('throughput_update', mock_throughput_lines)
    emit('units_update', mock_unitsdata)

@socketio.on('disconnect')
def on_disconnect():
    print("Client disconnected")
    

# --- Routes ---

@ns.route('/')
class Scoreboard(Resource):
    @ns.doc('get_scoreboard')
    @ns.marshal_with(scoreboard_model)
    def get(self):
        '''Retrieve the entire scoreboard'''
        return mock_scoreboard_data

    @ns.doc('add_score_row')
    @ns.expect(row_model, validate=True)
    def post(self):
        '''Add a new row to the scoreboard'''
        new_row = request.json
        mock_scoreboard_data['rows'].append(new_row)
        socketio.emit('scoreboard_update', new_row)  # Broadcast via WebSocket
        return {"message": "Row added"}, 201

@ns.route('/<string:line_name>')
@ns.param('line_name', 'The name of the production line')
class ScoreboardByLine(Resource):
    @ns.doc('get_score_by_line')
    @ns.marshal_with(row_model)
    def get(self, line_name):
        '''Get scoreboard row by line name'''
        row = next((r for r in mock_scoreboard_data['rows'] if r['location'][0] == line_name), None)
        if not row:
            api.abort(404, f"Line {line_name} not found")
        return row

    @ns.doc('update_score_by_line')
    @ns.expect(row_model, validate=True)
    def put(self, line_name):
        '''Update row for a specific line'''
        for idx, row in enumerate(mock_scoreboard_data['rows']):
            if row['location'][0] == line_name:
                mock_scoreboard_data['rows'][idx] = request.json
                socketio.emit('scoreboard_update', request.json)  # Notify all clients
                return {"message": f"Row for line '{line_name}' updated"}, 200
        api.abort(404, f"Line {line_name} not found")

    @ns.doc('delete_score_by_line')
    def delete(self, line_name):
        '''Delete row for a specific line'''
        original_len = len(mock_scoreboard_data['rows'])
        mock_scoreboard_data['rows'] = [r for r in mock_scoreboard_data['rows'] if r['location'][0] != line_name]
        if len(mock_scoreboard_data['rows']) < original_len:
            socketio.emit('scoreboard_delete', {'line': line_name})  # Notify clients
            return {"message": f"Row for line '{line_name}' deleted"}, 200
        else:
            return {"message": f"Line '{line_name}' not found"}, 404


@ns.route('/throughput')
class Throughput(Resource):
    @ns.doc('get_throughput_lines')
    def get(self):
        '''Retrieve throughput lines data'''
        socketio.emit('throughput_update',mock_throughput_lines)
        return mock_throughput_lines
    

# --- Main ---
if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
    
__all__ = ['api', 'ns', 'app','socketio']

print(app.url_map)
