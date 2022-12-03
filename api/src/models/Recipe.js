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
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });
};
