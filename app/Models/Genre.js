'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Genre extends Model {
  games(){
    return this.hasMany('App/Models/Game');
  }
}

module.exports = Genre
