// Get Quote From API 

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader'); 

function showLoadingSpinner(){
    loader.hidden = false; 
    quoteContainer.hidden = true; 

}

function removeLoadingSpinner(){
    if (!loader.hidden){
        quoteContainer.hidden = false; 
        loader.hidden = true; 
    }
}

async function getQuote(){
    // // TO avoid cors errror as api is not accessible through localhost, we use a proxy here. 

    showLoadingSpinner(); 
    const proxyUrl = 'http://api.allorigins.win/get?url='
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        // As we have async function, response will only be set after fetching is done and data will be set after json is done 
        // await basically pauses the code until the task in await is done 

        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

        const data = await response.json();
        const quoteObj = JSON.parse(data.contents); 


        if (quoteObj.quoteAuthor===''){
            authorText.innerText = 'Unknown'; 
        }
        else{
            authorText.innerText = quoteObj.quoteAuthor;
        }

        // Reduce font size of long quotes
        if (quoteObj.quoteText.length> 120){
            quoteText.classList.add('long-quote'); 
        }
        else{
            quoteText.classList.remove('long-quote'); 
        }
        quoteText.innerText = quoteObj.quoteText; 
        
        // stop loader and show quote
        removeLoadingSpinner();  
        
    }

    catch(error){
        console.log('whoops, no quote', error);
    }

}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText; 
    const author = authorText.innerText; 
    // Backtick is used to indicate template url 
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    // Open a new tab
    window.open(twitterUrl, '_blank');
}


// Event Listeners 
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuote();
