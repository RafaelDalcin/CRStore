import controller from '../controllers/discountCouponsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/discountCoupons', controller.getAll)
	app.post('/discountCoupons/persist', controller.persist)
	app.post('/discountCoupons/destroy', controller.destroy)
	app.get('/discountCoupons/:id', controller.getById)
}