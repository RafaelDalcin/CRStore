import controller from '../controllers/orderItemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/orderItems', controller.getAll)
	app.post('/orderItems/persist', controller.persist)
	app.post('/orderItems/destroy', controller.destroy)
	app.get('/orderItems/:id', controller.getById)
}