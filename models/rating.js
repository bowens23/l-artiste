module.exports = function(sequelize, DataTypes) {
	var Rating = sequelize.define("Rating", {
		rating: {
			type: DataTypes.INTEGER,
			min: 1,
			max: 5,
			allowNull: false
		}
	});

	Rating.associate = function(models) {
		// associates Rating with Artwork
		Rating.belongsTo(models.Artwork, {
			onDelete: "cascade"
		});
	}

	Rating.associate = function(models) {
		// associates Rating with User
		Rating.belongsTo(models.User, {
			unique: true
		});
	};

	return Rating;
};