module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  // Asegura que cada producto tiene un código único
        }
    }, {
        tableName: 'productos',
        timestamps: false
    });

    return Producto;
};
