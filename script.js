
/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
function addMovieQuote(){
    const quotes = ['May the force be with you', 'My Suits Are On The House, Or The House Burns Down.', 'Well, nobody is perfect.', 'Show me the money','Already Broken.'];

    //Pick a random quote
    const quote = quotes[Math.floor(Math.random()* quotes.length)];

    // Add it to the page
    const quoteContainer = document.getElementById('quote-container');
    quoteContainer.innerText = quote;
}