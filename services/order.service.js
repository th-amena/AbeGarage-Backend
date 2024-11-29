module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estimated_completion_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      completion_date: {
        type: DataTypes.DATE,
      },
      order_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
  );

  // Example relationship setup for order_services
  Order.associate = (models) => {
    Order.hasMany(models.OrderServices, {
      foreignKey: "order_id", // Ensure this matches the column in the OrderServices table
      as: "services", // Alias for easier access in queries
      onDelete: "CASCADE", // Delete related order services when the order is deleted
      onUpdate: "CASCADE", // Update foreign keys when the order ID changes
    });
  };

  return Order;
};
