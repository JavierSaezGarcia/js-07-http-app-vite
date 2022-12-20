import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

const route = import.meta.env.VITE_BASE_URL
/**
 * 
 * @param { String|Number } id
 * @returns {Promise<User[]>}
 */
export const getUserById = async( id ) => {

    const url = `${ route }/users/${ id }`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const user = localhostUserToModel( data );
    console.log(user);
    return user;
    

}