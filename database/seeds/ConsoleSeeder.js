'use strict'

/*
|--------------------------------------------------------------------------
| ConsoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');
const games = require('../ConsoleData');
const Console = use('App/Models/Console');

class ConsoleSeeder {
  async run () {
    const trx = await Database.beginTransaction()
    await Console.createMany(games, trx)
    trx.commit();
  }
}

module.exports = ConsoleSeeder
