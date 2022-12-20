import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 * 
 * @param { Number } page 
 * @returns {Promise<User[]>}
 */
const route = import.meta.env.VITE_BASE_URL

export const loadUsersByPage = async( page = 1 ) => {

    const url = `${ route }/users?_page=${ page }`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const users = data.map( localhostUserToModel );
    // console.log(users);
    return users;
    

}