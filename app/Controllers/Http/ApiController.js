'use strict';
const axios = use('axios');
const Database = use('Database')
const Game = use('App/Models/Game')
const Console = use('App/Models/Console')
const User = use('App/Models/User')

class ApiController {

  async getGame({response, request}){
    const {consoles, genres} = JSON.parse(request.all().filters)
  //  console.log(request)
    try{
      const game = await Database
        .from('games')
        .whereIn('genre_id', genres).whereIn('console_id', consoles)
        .innerJoin('genres', 'games.genre_id', 'genres.id')
        .innerJoin('consoles', 'games.console_id', 'consoles.id')
        .select('title', 'img_url', 'consoles.name as console', 'genres.name as genre')
        .orderByRaw('RANDOM()')
        .limit(1)
      console.log(game[0])
      return game[0]
    } catch (e){
      console.log(e)
    }
  }

  async getGameById({response, request}){
    const {id} = JSON.parse(request.all())
  //  console.log(request)
  if(auth.check()){
    try{
      const game = await Database
        .from('games')
        .where('id', id)
        .innerJoin('genres', 'games.genre_id', 'genres.id')
        .innerJoin('consoles', 'games.console_id', 'consoles.id')
        .select('games.id as id',"console_id", "genre_id",'title', "games.img_url", 'consoles.name as console', 'genres.name as genre')
      console.log(game)
      return game
    } catch (e){
      console.log(e)
    }
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
      filters.consoles = await Database.select('id as value','name as label', 'img_url').from('consoles')
      filters.genres = await Database.select('id as value','name as label').from('genres')
      return filters
    } catch(e){
      console.log(e)
      return response.status(500).send()
    }

  }

  async getAllGames({request, response, auth}){
    if(auth.check()){
      try{
        const game = await Database
          .from('games')
          .innerJoin('genres', 'games.genre_id', 'genres.id')
          .innerJoin('consoles', 'games.console_id', 'consoles.id')
          .select('games.id as id',"console_id", "genre_id",'title', "games.img_url", 'consoles.name as console', 'genres.name as genre')

        return game
      } catch (e){
        return response.status(500).send()
      }
    }
  }

  async updateGame({request, response, auth}){
    if(auth.check()){
      try{
        const game = request.all()
        await Game
          .query()
          .where('id', game.id)
          .update({title: game.title, console_id: game.console_id, genre_id: game.genre_id, img_url: game.img_url })
      }catch(e){
        console.log(e)
        return response.status(500).send()
      }
    }
  }

  async deleteGame({request, response, auth}){
      if(auth.check()){
        try{
          const { id } = request.all()
          console.log(id)
          const game = await Game.find(id)
          await game.delete()
          return response.status(200).send()
        }catch(e){
          return response.status(500).send()
        }
      }
    }

  async createGame({request, response, auth}){
    if(auth.check()){
      try{
        const game = await Game.create(request.all())
        console.log(game)
        response.send(game)

      }catch(e){
        console.log(e)
        return response.status(500).send()
      }
    }
  }

  async updateConsole({request, response, auth}){
    if(auth.check()){
      try{
        const gameConsole = request.all()
        console.log(gameConsole)
        await Console
          .query()
          .where('id', gameConsole.id)
          .update({name: gameConsole.name, img_url: gameConsole.img_url })
      }catch(e){
        console.log(e)
        return response.status(500).send()
      }
    }
  }

  async error({response}){
    return response.status(405).send()
  }
}

module.exports = ApiController;
