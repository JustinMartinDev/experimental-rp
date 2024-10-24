 FiveM: 
  GetPedId =>
  GetPlayerId => 

User => 
  id,
  steamId,
  defaultPlayerId

Player add:
  model: string
  position: {x, y, z}
    
onPlayerJoin => 
  Get User using steamId
  Get Player using defaultPlayerId

  SetPlayerPed model
  SetPlayerPosition

onPlayerChangePed =>
  Get Player using param player id
  
  CreatePed with actual pedInfo
  Freeze new ped

  Change the PlayerPed Display
