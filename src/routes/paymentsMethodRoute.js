import controller from '../controllers/paymentsMethod'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/payment-method', controller.getAll)
	app.post('/payment-method/persist', controller.persist)
	app.post('/payment-method/destroy', controller.destroy)
	app.get('/payment-method/:id', controller.getAll)
}