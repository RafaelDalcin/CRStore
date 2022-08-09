import controller from '../controllers/addressesController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	
	app.get('/addresses', controller.getAll)
	app.post('/addresses/persist/', controller.persist)
	app.post('/addresses/destroy', controller.destroy)
	app.post('/addresses/user/', controller.getAddressByUserToken)
	app.get('/addresses/:id', controller.getById)
}