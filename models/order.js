module.exports = function(sequelize, DataTypes) {
	var Orders = sequelize.define("Orders", {
		item: {
			type: DataTypes.STRING,
			allowNull: false,
		}, 
		price: {
			type: DataTypes.DECIMAL(15,2),
			allowNull: false,
			isNumeric: true
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			isNumeric: true
		}
	});

	Orders.associate = function(models) {
		Orders.hasOne(models.Transactions, {
			foreignKey: {
				allowNull: false
			}
		});

		Orders.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});

		Orders.belongsTo(models.Artist, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	
	return Orders;
};