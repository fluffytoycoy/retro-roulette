'use strict';
const axios = use('axios');
const Database = use('Database')
const Game = use('App/Models/Game')
const User = use('App/Models/User')
class ApiController {
  async getGenres({response, request}){
  //  console.log(request)
    try{
      const game = await Database
        .from('games')
        .whereNotIn('genre_id', [])
        .innerJoin('genres', 'games.genre_id', 'genres.id')
        .select('title', 'name as genre')
        .orderByRaw('RANDOM()')
        .limit(1)
      console.log(game)
      return game
    } catch (e){
      console.log(e)
    }
  }
  async login({response, auth, request}){

    const {username, password} = request.all();

    try{
      let token = await auth.attempt(username, password);
      let user = await User.findBy('username', username)

      Object.assign(user, token);
      return response.json(user);

    } catch (error){
      return response.status(401).send()
    }
  }
}

module.exports = ApiController;
