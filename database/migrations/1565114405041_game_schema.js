'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.integer('genre_id').notNullable().unsigned().references('id').inTable('genres')
      table.integer('console_id').notNullable().unsigned().references('id').inTable('consoles')
      table.string('img_url')
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
