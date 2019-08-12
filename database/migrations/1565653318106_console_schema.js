'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConsoleSchema extends Schema {
  up () {
    this.create('consoles', (table) => {
      table.increments()
      table.string('name', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('consoles')
  }
}

module.exports = ConsoleSchema
