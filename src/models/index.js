// import User from "./User";
import Item from "./Item";
import Category from "./Category";
import PaymentMethod from "./PaymentMethod";
import DiscountCoupon from "./DiscountCoupon"
import Address from "./Address";
import Order from "./Order";
import User from "./User";
import OrderItem  from "./OrderItem";

(async () => {

  await User.sync({ force: true })
  await Category.sync({ force: true })
  await Item.sync({ force: true })
  await PaymentMethod.sync({ force: true })
  await DiscountCoupon.sync({ force: true })
  await Address.sync({ force: true })
  await Order.sync({ force: true }) 
  await OrderItem.sync({ force: true})

})();