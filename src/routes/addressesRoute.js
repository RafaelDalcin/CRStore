import controller from '../controllers/addressesController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	
	app.get('/addresses', controller.get)
	app.post('/addresses/persist/', controller.persist)
	app.post('/addresses/destroy', controller.destroy)
}