'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  genre(){
    return this.hasOne('App/Model/Genre');
  }
}

module.exports = Game
