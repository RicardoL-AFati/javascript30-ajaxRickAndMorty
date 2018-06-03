// Endpoint is character resource URL from rickandmortyapi
const characterEndP = 'https://rickandmortyapi.com/api/character/';
// Will hold JSON data
const characters = [];
// fetching the data from endpoint
fetch(characterEndP)
  .then(blob => blob.json())
  .then(data => characters.push(...data.results));

// Creates subset of characters. Elements that match search string
function findMatches(matchString, characters) {  
  return characters.filter(character => {
    /* Makes a regex from matchString. 
       Returns elements where name or species matches */   
    const regex = new RegExp(matchString, 'gi');
    return character.name.match(regex) || character.species.match(regex)  
  });
}

/* Calls findMatches and uses returned subset to construct html 
   to replace ul element's innerHTML. */
function displayMatches() {
  // finding matches with value of search input  
  const matchArray = findMatches(this.value, characters);
  // Looping over found matches, creating an array of html
  const html = matchArray.map(character => {
    // regex from search input value  
    const regex = new RegExp(this.value, 'gi');
    // name is character.name with the regex match wrapped in span
    const name = character.name.replace(regex, `<span class='hl'>${this.value}</span>`);  
    // species is character.species with the regex match wrapped in span
    const species = character.species.replace(regex, `<span class='hl'>${this.value}</span>`);
    // return two li elements. Top: name & species, bottom: status & location
    return `
      <li>
        <span>${name}</span>
        <span><em>Species: </em>${species}</span>
      </li>
      <li>
        <span class='info1'><em>Status: </em>${character.status}</span>
        <span class='info2'><em>Last known location: </em>${character.location.name}</span>
      </li>
    `;
  }).join('');
  // join array into one string before replacing ul's innerHTML with html
  suggestions.innerHTML = html;
}
// Selecting input and ul element
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
// Adding eventlisteners to input element to run and display searches 
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
