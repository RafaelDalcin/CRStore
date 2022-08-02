import controller from '../controllers/categoriesController.js'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/categories', controller.getAll)
	app.post('/categories/persist/', controller.persist)
	app.post('/categories/destroy', controller.destroy)
	app.get('/categories/:id', controller.getById)
}