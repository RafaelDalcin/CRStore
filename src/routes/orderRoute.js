import controller from '../controllers/ordersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/orders', controller.getAll)
	app.post('/orders/persist', controller.persist)
	app.post('/orders/destroy', controller.destroy)
	app.get('/orders/:id', controller.getById)
}