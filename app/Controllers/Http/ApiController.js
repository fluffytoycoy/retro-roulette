'use strict';
const axios = use('axios');
const Database = use('Database')
const Game = use('App/Models/Game')
class ApiController {
  async getGenres({response, request}){
  //  console.log(request)
    try{
      const game = await Database
        .from('games')
        .whereNotIn('genre_id', [1,2])
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
}

module.exports = ApiController;
