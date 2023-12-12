const {Sequelize} = require('sequelize');


module.exports = function(sequelize) {
    return sequelize.define("position",
    {
        idposition: {type: Sequelize.SMALLINT.UNSIGNED, primaryKey: true},
        name: {type:Sequelize.STRING(90)},
        mark: {type:Sequelize.STRING(90)},
        units: {type:Sequelize.STRING(90)},
        unitssecond: {type:Sequelize.STRING(90)},
        coef: {type:Sequelize.STRING(90)}
    },
    {
        timestamps: false,
        tablename: 'position',
        freezeTableName: true
    }
    );
}