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
    profile_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });
  const userCard = sequelize.define('user_card', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(19),
      allowNull: false,
    },
    cvv: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
    },
  });
  User.hasMany(userAddress);
  User.hasMany(userCard);
  return { User, userAddress, userCard };
};
