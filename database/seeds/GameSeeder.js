'use strict'

/*
|--------------------------------------------------------------------------
| GameSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const games = require('../GameData');
const Game = use('App/Models/Game')

//const games = [{title: 'game 1', genre_id: 1}, {title: 'game 2', genre_id: 3}]
class GameSeeder {

  async run () {
    const trx = await Database.beginTransaction()
    await Game.createMany(games, trx)
    trx.commit();

  }
}

module.exports = GameSeeder
