import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import DiscountCoupon from "./DiscountCoupon";
import PaymentForm from "./PaymentForm";
import User from "./User";

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "order_code"
    },

  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsTo(User, { 
  as: 'customer', 
  foreignKey: {
    name: 'idCustomer',
    field: 'id_customer',
    allowNull: false
  }
});

Order.belongsTo(User, { 
  as: 'deliveryman', 
  foreignKey: {
    name: 'idDeliveryman',
    field: 'id_deliveryman',
    allowNull: false
  }
});

Order.belongsTo(DiscountCoupon, { 
  as: 'discountcoupon', 
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idDiscountCoupon',
    field: 'id_discount_coupon',
    allowNull: false
  }
});
Order.belongsTo(PaymentForm, { 
  as: 'paymentform', 
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idPaymentForm',
    field: 'id_payment_form',
    allowNull: false
  }
});


export default Order;
