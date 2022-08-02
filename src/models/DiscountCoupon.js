import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const DiscountCoupon = sequelize.define(
  'discount_coupons',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    discountCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      field: "discount_code"
    },
    discountValue: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "discount_value"
    },
    discountType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "discount_type"
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default DiscountCoupon;
