'use strict';
const axios = use('axios');
const Database = use('Database')
const Game = use('App/Models/Game')
const User = use('App/Models/User')
class ApiController {
  async getGame({response, request}){
    console.log(JSON.parse(request.all().filters))
  //  console.log(request)
    try{
      const game = await Database
        .from('games')
        .whereIn('genre_id', [1]).whereIn('console_id', [1])
        .innerJoin('genres', 'games.genre_id', 'genres.id')
        .innerJoin('consoles', 'games.console_id', 'consoles.id')
        .select('title',"img_url", 'consoles.name as console', 'genres.name as genre')
        .orderByRaw('RANDOM()')
        .limit(1)
      console.log(game[0])
      return game[0]
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

  async getFilters({request, response}){
    const filters = {}
    try{
      filters.consoles = await Database.select('id as value','name as label').from('consoles')
      filters.genres = await Database.select('id as value','name as label').from('genres')
      return filters
    } catch(e){
      console.log(e)
      return response.status(500).send()
    }

  }
}

module.exports = ApiController;
