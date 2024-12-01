module.exports = (sequelize, DataTypes) => {
    const VentaProducto = sequelize.define('VentaProducto', {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'venta_productos',
        timestamps: false
    });

    return VentaProducto;
};
