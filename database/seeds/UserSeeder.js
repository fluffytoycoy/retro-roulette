'use strict'

/*
|--------------------------------------------------------------------------
| GenreSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database');
const User = use('App/Models/User')
const users = [{username: 'guest', email: 'na', password: 'guest'},
              {username: 'admin', email: 'test', password: 'test', role_id: 2}]
class UserSeeder {
  async run () {
    const trx = await Database.beginTransaction()
    await User.createMany(users, trx)
    trx.commit();
  }
}

module.exports = UserSeeder
