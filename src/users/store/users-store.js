import { loadUsersByPage } from "../use-cases/load-users-by-page";


const state = {
    currentPage: 0,
    users: []
}
const loadNextPage = async() => {
    const users = await loadUsersByPage( state.currentPage + 1 );
    if ( users.length === 0) return;
    state.currentPage += 1;
    state.users = users;
    console.log(state);
}

const loadPreviousPage = async() => {
    const users = await loadUsersByPage( state.currentPage - 1 );
    if ( users.length === 0) return;
    if ( state.currentPage === 1 ) return;
    state.currentPage -= 1;
    state.users = users;
}
/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = async( updatedUser ) => {

    let wasFound = false;

    state.users = state.users.map( user => {
        if( user.id === updatedUser.id ){
            wasFound = true;
            return updatedUser;
        }
        return user
    });
    
    if( state.users.length < 10 && !wasFound) {
        state.users.push( updatedUser )
    }
}

export const reloadPage = async() => {
    const users = await loadUsersByPage( state.currentPage );
    if ( users.length === 0) {
        return await loadPreviousPage();
    };
    
    state.users = users;
    console.log(state);
}
export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    /** 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}