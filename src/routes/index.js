import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import categoriesRoute from "./categoriesRoute";
import paymentsMethodRoute from "./paymentsMethodRoute"
import discountCouponRoute from "./discountCouponRoute";
import addressesRoute from "./addressesRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	categoriesRoute(app);
	paymentsMethodRoute(app);
	discountCouponRoute(app);
	addressesRoute(app);
}

export default Routes;