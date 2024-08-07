// a module to use different API endpoints.
// we will handle whatever modifying we need to do in order to connect the back and front. for exmaple, modifying expected types and so on.
// each function here must return {error, data, error_message}

import { User } from "../../interfaces";
import { GlobalAxios } from "./GlobalAxios";
// import logger from "./logger";
export const signInWithJwt = async (jwtToken: string) => {
  return await GlobalAxios("POST", "sso_signin", { jwtToken }, false, true);
};

export const adminSignIn = async (data: {
  personalnumber: string;
  adminpassword: string;
}) => {
  return await GlobalAxios("POST", "admin_signin/", data, false, true);
  // return {error: true, error_message: "120"}
};

export const signIn = async (data: { personalnumber: string }) => {
  return await GlobalAxios("POST", "signin", data);
};

export const loadUsersApproved = async () => {
  const result = await GlobalAxios("GET", "usersvalidated/");
  if (result.data) {
    result.data.forEach((user: User) => {
      user.updatedAt = new Date(user.updatedAt);
      user.createdAt = new Date(user.createdAt);
    });
  }

  return result;
};
export const loadUsersWaitingForApproval = async () => {
  const result = await GlobalAxios("GET", "usersnotvalidated/");
  if (result.data) {
    result.data.forEach((user: User) => {
      user.updatedAt = new Date(user.updatedAt);
      user.createdAt = new Date(user.createdAt);
    });
  }

  return result;
};
export const getAllUsers = async () => {
  return await GlobalAxios("GET", "users");
};

// export const getBanks = async () => {
//   return await GlobalAxios("GET", "get_banks");
// };

export const signUpUser = async (user: any) => {
  return await GlobalAxios("POST", "signup", user);
};

export const deleteUser = async (userId: string) => {
  return GlobalAxios("PUT", "user/remove/" + userId);
};
// export const deleteArenaUsers = async (arenaId: string) => {
//   return GlobalAxios("PUT", "user/removeArenaUsers/" + arenaId);
// };

export const updateUser = async (user: User, id: string) => {
  return GlobalAxios("PUT", "user/update/" + id, user);
};

// export const getAllReserves = async () => {
//   return GlobalAxios("GET", "reserves/");
// };
// export const updateReserve = async (data: reserveType, id: string) => {
//   return GlobalAxios("POST", "reserves/update/" + id, data);
// };
// export const findReservesByCenterId = async (centerId: any) => {
//   return GlobalAxios("GET", "reserves/findReservesByCenterId/" + centerId);
// };
// export const findReservesByArenaId = async (arenaId: any) => {
//   return GlobalAxios("GET", "reserves/findReservesByArenaId/" + arenaId);
// };
// export const getAllReservesNoShamp = async () => {
//   return GlobalAxios("GET", "reserves/getAllReservesNoShamp");
// };
// export const getAllReservesByCenterNoShamp = async (centerId: any) => {
//   return GlobalAxios(
//     "GET",
//     "reserves/getAllReservesByCenterNoShamp/" + centerId
//   );
// };
// export const getAllReservesByArenaNoShamp = async (arenaId: any) => {
//   return GlobalAxios("GET", "reserves/getAllReservesByArenaNoShamp/" + arenaId);
// };
// export const getAllDataToDashboard = async () => {
//   return GlobalAxios("GET", "reserves/getAllDataToDashboard");
// };
// export const getAllDataByCenters = async (data: any) => {
//   return GlobalAxios("GET", "reserves/getAllDataByCenters/" + data);
// };
// export const getAllDataByArenas = async (data: any) => {
//   return GlobalAxios("GET", "reserves/getAllDataByArenas/" + data);
// };
// export const addReserve = async (data: object) => {
//   return GlobalAxios("POST", "reserves/add/", data);
// };
// export const updateExcelReserve = async (data: object) => {
//   return GlobalAxios("POST", "reserves/update_excel_reserves/", data);
// };
// export const deleteReserve = async (id: string) => {
//   return GlobalAxios("PUT", "reserves/remove/" + id);
// };

// export const getEnvironment = async () => {
//   return GlobalAxios("GET", "environments");
// };
// export const addEnvironment = async (data: object) => {
//   return GlobalAxios("POST", "environments/add/", data);
// };
// export const updateEnvironment = async (data: arenaType, id: string) => {
//   return GlobalAxios("POST", "environments/update/" + id, data);
// };
// export const deleteEnvironment = async (environmentId: string) => {
//   return GlobalAxios("PUT", "environments/remove/" + environmentId);
// };

// export const getArenas = async () => {
//   return await GlobalAxios("GET", "arenas/");
// };
// export const getArenaById = async (id: string) => {
//   return await GlobalAxios("GET", "arenas/getById/" + id);
// };
// export const getAllCentersInArenas = async () => {
//   return await GlobalAxios("GET", "arenas/getAllCentersInArenas");
// };
// export const getAllDataByArena = async (data: any) => {
//   return GlobalAxios("GET", "arenas/getAllDataByArena/" + data);
// };
// export const addArena = async (data: object) => {
//   return GlobalAxios("POST", "arenas/add/", data);
// };
// export const updateArena = async (data: object, id: string) => {
//   return GlobalAxios("POST", "arenas/update/" + id, data);
// };
// export const deleteArena = async (arenaId: string) => {
//   return GlobalAxios("PUT", "arenas/remove/" + arenaId);
// };
// export const getUnitsBankByArena = async (arenaId: string) => {
//   return await GlobalAxios("GET", "arenas/get/UnitsBankByArena/" + arenaId);
// };

// export const getCenters = async () => {
//   return await GlobalAxios("GET", "centers/");
// };
// export const getUnitsBank = async () => {
//   return await GlobalAxios("GET", "centers/get/UnitsBank");
// };
// export const getUnitsBankByCenter = async (centerId: string) => {
//   return await GlobalAxios("GET", "centers/get/UnitsBankByCenter/" + centerId);
// };

// export const getHativas = async () => {
//   return await GlobalAxios("GET", "hativas/");
// };

// export const getRegisterUnits = async () => {
//   return await GlobalAxios("GET", "registerunit/");
// };

// export const getFrames = async () => {
//   return await GlobalAxios("GET", "frames/");
// };

// export const getOccupations = async () => {
//   return await GlobalAxios("GET", "occupations/");
// };
