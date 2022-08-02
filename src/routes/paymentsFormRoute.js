import controller from '../controllers/paymentsFormController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/paymentsForm', controller.getAll)
	app.post('/paymentsForm/persist', controller.persist)
	app.post('/paymentsForm/destroy', controller.destroy)
	app.get('/paymentsForm/:id', controller.getAll)
}