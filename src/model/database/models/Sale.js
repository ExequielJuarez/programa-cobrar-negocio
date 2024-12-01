module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        }
    }, {
        tableName: 'sales',
        timestamps: false
    });

    // Definir la relación con VentaProducto
    Sale.belongsToMany(sequelize.models.Producto, {
        through: 'VentaProducto',
        foreignKey: 'sale_id', // La clave foránea en la tabla intermedia
        otherKey: 'producto_id' // La clave foránea del otro modelo (Producto)
    });

    return Sale;
};
