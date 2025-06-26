from flask_restx import Resource
from app import ns, socketio
from mock_data import mock_unitsdata  # wherever your mock data is

@ns.route('/unitsdata')
class UnitManHourData(Resource):
    @ns.doc('get_unitmanhourdata')
    def get(self):
        '''Get Units/Man Hour chart data'''
        socketio.emit('units_update', mock_unitsdata)
        return mock_unitsdata


print("unitmanhourdata route loaded")
