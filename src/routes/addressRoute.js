import controller from '../controllers/addressController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/address', controller.getAll)
	app.post('/address/persist/', controller.persist)
	app.post('/address/destroy', controller.destroy)
	app.get('/address/:id', controller.getById)
}