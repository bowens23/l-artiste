module.exports = function(sequelize, DataTypes) {
	var Transactions = sequelize.define("Transactions", {
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		total: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false,
			isNumeric: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		}, 
		zipCode: {
			type: DataTypes.INTEGER,
			allowNull: false,
			isNumeric: true
		}
	});

	Transactions.associate = function(models) {
		//associates Transaction with Artist
		Transactions.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});

		Transactions.belongsTo(models.Artist, {
			foreignKey: {
				allowNull: false
			}
		});

		Transactions.belongsTo(models.Artwork, {
			foreignKey: {
				allowNull: false
			}
		});
		
	};

	return Transactions;
};