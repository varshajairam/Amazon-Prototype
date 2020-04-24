module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Customer', 'Seller', 'Admin'),
      allowNull: false,
    },
  });
  const userAddress = sequelize.define('user_address', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });
  User.hasMany(userAddress);
  return { User, userAddress };
};
