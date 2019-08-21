export default function checkRoles(role, callback){
  if(role > 1){
    callback()
  }else{
    alert('guests cannot edit, create or delete values')
  }

}
