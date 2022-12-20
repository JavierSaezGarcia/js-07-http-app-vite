// UN MAPPER EVITA Y NORMALIZA LA DATA DE LA BASE DE DATOS DESPREOCUPANDONOS SI CAMBIA ALGUNA KEY EN MITAD DE LA DATA
// POR EJEMPLO 'first_name' y queremos que sea 'firstName' en CamelCase y no con sneak
import { User } from "../models/user"

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns 
 */
export const localhostUserToModel = ( localhostUser ) => {

    const {
        id,
        isActive,
        balance,
        avatar,
        first_name,
        last_name,
        gender

    } = localhostUser;

    return new User({
        id,
        isActive,
        balance,
        avatar,
        firstName: first_name, // distinta key en la BD a como la queremos que es en CamelCase
        lastName: last_name,   // esta igual y las demas se quedan como estan
        gender                 // es como si pusieramos gender: gender normalizando redundantes se queda solo en gender desde ECS6

    });
}

