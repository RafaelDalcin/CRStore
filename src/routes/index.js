import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import categoriesRoute from "./categoriesRoute";
import paymentsFormRoute from "./paymentsFormRoute"

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	categoriesRoute(app);
	paymentsFormRoute(app);
}

export default Routes;