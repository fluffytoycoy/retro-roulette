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
    Route.get('/testAuth', 'ApiController.test').middleware('auth')
    Route.get('/getGameById', 'ApiController.getGameById').middleware('auth')
}).prefix('api/');

Route.any('*', ({ response }) => {
  response.download(Helpers.publicPath('react/app.html'));
});
