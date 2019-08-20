'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const Helpers = use('Helpers');

Route.group(() => {
    Route.get('/test', 'ApiController.getGame');
    Route.post('/login', 'ApiController.login');
    Route.get('/filterInfo', 'ApiController.getFilters');
    Route.get('/getAllGames', 'ApiController.getAllGames').middleware('auth')
    Route.get('/getGameById', 'ApiController.getGameById').middleware('auth')
    Route.post('/updateGame', 'ApiController.updateGame').middleware('auth')
    Route.post('/deleteGame', 'ApiController.deleteGame').middleware('auth')
    Route.post('/createGame', 'ApiController.createGame').middleware('auth')
    Route.post('/updateConsole', 'ApiController.updateConsole').middleware('auth')
    Route.any('*', 'ApiController.error')
}).prefix('api/');

Route.any('*', ({ response }) => {
  response.download(Helpers.publicPath('react/app.html'));
});
