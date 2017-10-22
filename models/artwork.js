module.exports = function(sequelize, DataTypes) {
	var Artwork = sequelize.define("Artwork", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		media: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		rating: {
			type: DataTypes.INTEGER,
			min: 1,
			max: 5,
			allowNull: false
		},
		price: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false,
			isNumeric: true
		}
	});

	Artwork.associate = function(models) {
		// associates Artwork with Artist
		Artwork.belongsTo(models.Artist, {
			foreignKey: {
		    	allowNull: true
		    }
		});
	};

	return Artwork;
};