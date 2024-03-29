import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from "../../models/user";
import { getUserById } from "../../use-cases/get-user-by-id";

/**
 * @param {(userLike) => Promise<void>} callback
 * @param {HTMLDivElement} element 
 */

let modal, form;
let loadedUser = {};

export const renderModal = ( element, callback ) => {

    if( modal ) return;
   // modal
    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    //form
    form = modal.querySelector('form');
    
    modal.addEventListener('click', (event) => {
        if( event.target.className === 'modal-container'){
            hideModal();
        };
        
    });

    form.addEventListener('submit', async( event ) => {
            event.preventDefault();
            const formData = new FormData( form );
            const userLike = { ...loadedUser };

            for( const [key ,value] of formData){
                console.log(key,value);
                if( key === 'isActive'){           
                   
                    userLike[key] = (value === 'on') ? true : false;                
                    
                    continue;
                }
                if( key === 'balance'){
                    userLike[key] = +value;
                    continue;
                }
                
                //alert(key)

                userLike[key] = value;
                
            }

            // console.log(userLike);
            // TODO guardar usuario

            await callback( userLike )
            hideModal();
    });

    element.append( modal );

}

export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if( !id ) return;
    const user = await getUserById( id );
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();   
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').value = user.isActive;
    loadedUser = user;


}
