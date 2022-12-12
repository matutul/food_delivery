import { fetchUser } from "../utils/fetchDataFromLocalStorage";
const userInfo = fetchUser();
export const initialState = {
    user: userInfo,
}