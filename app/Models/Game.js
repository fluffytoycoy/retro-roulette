'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  genre(){
    return this.belongsTo('App/Models/Genre');
  }
}

module.exports = Game
