'use strict';
const axios = use('axios');
const Database = use('Database')
const Game = use('App/Models/Game')
class ApiController {
  async getGenres(){
    console.log('getGenres')
    try{
      // const genres = await Database
      //   .table('games').genre()
      //   console.log(genres)
      // const game = await Game
      // .query()
      // .with('genre')
      // .fetch()
      const game = await Database
        .from('games')
        .whereNotIn('genre_id', [])
        .innerJoin('genres', 'games.genre_id', 'genres.id')
        .select('title', 'name as genre')
      console.log(game)
    } catch (e){
      console.log(e)
    }


  }
}

module.exports = ApiController;
