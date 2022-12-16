const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });
};
