'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint('App/Models/Genre', async (faker, i, data) => {
  console.log(i)
  return {
    name: data[i],
  }
})

Factory.blueprint('App/Models/Game', async (faker, i, data) => {
  console.log(i)
  return {
    title: data[i].title,
    genre_id: data[i].genre_id
  }
})