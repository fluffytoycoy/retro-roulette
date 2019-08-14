'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  genre(){
    return this.belongsTo('App/Models/Genre');
  }
  platform(){
    return this.hasMany('App/Models/Console');
  }
}

module.exports = Game
