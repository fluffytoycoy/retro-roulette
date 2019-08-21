  export function buildConsoleFilterItem(id, consoleName, img_url){
    return {label: consoleName, value: id, img_url: img_url}
  }
  export function buildDbConsoleObj(id, consoleName, img_url){
    return {name: consoleName, id: id, img_url: img_url}
  }
  export function buildGameListItem(game, detailOptions){
    const console_id = Number(game.console_id);
    const genre_id = Number(game.genre_id);
    return {
      id: Number(game.id),
      title: game.title,
      genre_id: genre_id,
      console_id: console_id,
      console: detailOptions.consoles.filter(item => item.value === console_id)[0].label,
      genre: detailOptions.genres.filter(genre => genre.value === genre_id)[0].label
    }
  }
