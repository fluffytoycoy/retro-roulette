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
  const genres = ['action', 'first person shooter', 'sports']
  console.log(i)
  return {
    name: genres[i],
  }
})

Factory.blueprint('App/Models/Game', async (faker, i, data) => {
  console.log(i)
  return {
    title: faker.first(),
    genre_id: 4
  }
})