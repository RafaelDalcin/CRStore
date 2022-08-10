import controller from '../controllers/usersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/users-token/', controller.getUserByToken)
	app.get('/users/', controller.getAll)
	app.post('/users/login', controller.login)
	app.post('/users/register', controller.register)
}