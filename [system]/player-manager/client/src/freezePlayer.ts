
export const freezePlayer = (id: number) => {
  const player = id;
  SetPlayerControl(player, false, 0);
  
  const ped = GetPlayerPed(player);

  if (IsEntityVisible(ped)) {
    SetEntityVisible(ped, false, false);
  }

  SetEntityCollision(ped, false, false);
  FreezeEntityPosition(ped, true);
  SetPlayerInvincible(player, true);

  if (!IsPedFatallyInjured(ped)) {
    ClearPedTasksImmediately(ped);
  }
}

export const unfreezePlayer = (id: number) => {
  const player = id;
  SetPlayerControl(player, true, 0);
  
  const ped = GetPlayerPed(player);

  if (!IsEntityVisible(ped)) {
    SetEntityVisible(ped, true, false);
  }

  if (!IsPedInAnyVehicle(ped, true)) {
    SetEntityCollision(ped, true, true);
  }

  FreezeEntityPosition(ped, false);
  SetPlayerInvincible(player, false);
}



