module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6,12]
    }
  });

  User.associate = function(models) {
    // associates User with Transactions
    User.hasMany(models.Transactions, {
      onDelete: "cascade"
    });

    User.hasMany(models.Orders, {
      onDelete: "cascade"
    });
  };

  return User;
};