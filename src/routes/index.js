import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import categoriesRoute from "./categoriesRoute";
import paymentsMethodRoute from "./paymentsMethodRoute"
import discountCouponRoute from "./discountCouponRoute";
import addressRoute from "./addressRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	categoriesRoute(app);
	paymentsMethodRoute(app);
	discountCouponRoute(app);
	addressRoute(app);
}

export default Routes;