import modalHtml from './render-modal.html?raw';
import './render-modal.css'

/**
 * 
 * @param {HTMLDivElement} element 
 */

let modal, form;

export const renderModal = ( element ) => {

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

    form.addEventListener('submit', ( event ) => {
            event.preventDefault();
            const formData = new FormData( form );
            const userLike = {};

            for( const [key, value] of formData){
                if( key === 'balance'){
                    userLike[key] = +value;
                    continue;
                }
                if( key === 'isActive'){
                    userLike[key] = ( value === 'on') ? true : false;
                    continue;
                }

                userLike[key] = value;
                
            }

            // console.log(userLike);
            // TODO guardar usuario
            hideModal();
    });

    element.append( modal );

}

export const showModal = () => {
    modal?.classList.remove('hide-modal')
}

export const hideModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
   
}



