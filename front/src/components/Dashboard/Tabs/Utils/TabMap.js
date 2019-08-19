const TabMap={
  games: 0,
  genre: 1,
  console: 3
}

function findTabIndex(urlParam){
  return urlParam ? TabMap[urlParam.toLowerCase()] : 0;
}


export default findTabIndex;
