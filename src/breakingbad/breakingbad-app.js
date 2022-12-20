
/**
 * @returns { Promise<Object> } quote information
 */

// Por que devuelve una promesa puedo poner async
const fetchQuote = async() => {

    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes/20');
    const data = await res.json();
    console.log(data[0]);
    return data[0];
}

/**
 * 
 * @param { HTMLDivElement } element 
 */

export const BreakingbadApp = async( element ) => {

    document.querySelector('#app-title').innerText = 'Breakingbad App';
    element.innerHTML = 'Loading...';
    const quote = await fetchQuote();

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';

    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren( authorLabel, quoteLabel,  nextQuoteButton);
    }

    // añadir listener
    nextQuoteButton.addEventListener('click', async() => {
        element.innerHTML = 'Loading...';
        nextQuoteButton.disabled = true;
        
        
        
        const quote = await fetchQuote();
        renderQuote( quote );
        nextQuoteButton.disabled = false;

    })

    fetchQuote()
        .then( renderQuote );
    

}