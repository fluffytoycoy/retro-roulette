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
  const genres = require('../GenreData')

class GenreSeeder {
  async run () {
    await Factory.model('App/Models/Genre').createMany(genres.length, genres)
  }
}

module.exports = GenreSeeder
