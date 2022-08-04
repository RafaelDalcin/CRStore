import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Item from "./Item";
import Order from "./Order";

const OrderItem = sequelize.define(
  'order_items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false,
    },

  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

OrderItem.belongsTo(Order, { 
  as: 'order', 
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idOrder',
    field: 'id_order',
    allowNull: false
  }
});

OrderItem.belongsTo(Item, { 
  as: 'item', 
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idItem',
    field: 'id_item',
    allowNull: false
  }
});

export default OrderItem;
