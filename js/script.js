//Pokemon list and functions in IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    {name:'Balbasaur', height: 6, type:['grass', 'poison']},
    {name:'Squirtle', height: 15, type:['water']},
    {name:'Pikachu', height: 5, type:['electric']},
    {name:'Charmander', height: 12, type:['fire', 'flying']},
  ];
  //add pokemon to pokemonList function if typeof is object
    function add(pokemon) {
      if (typeof pokemon === 'object'
      // && Object.keys(pokemonList) === true  **NOT WORKING NEED HELP**
    ) {
        pokemonList.push(pokemon);
      } else {
        return 0;
        console.log('Invalid Pokemon');
      }
    }
  //retieve pokemon from pokemonList function
    function getAll() {
      return pokemonList;
    }
  //returns functions
    return {
      add: add,
      getAll: getAll,
  };
})();

pokemonRepository.add({name:'pichu', height: 12});
console.log(pokemonRepository.getAll());

//retrieves all items from pokemonList and passes them through foreach loop
pokemonRepository.getAll().forEach(pokemonListFunction);

//adds comment to each big pokemon and places them on their own lines
function pokemonListFunction(pokemon) {
  if (pokemon.height >= 10) {
  document.write('<p>' + pokemon.name + ', Height:' + pokemon.height + ', Type:' + pokemon.type + ' -Wow, thats big! </p>');
} else {
  document.write('<p>' + pokemon.name + ', Height:' + pokemon.height + ', Type:' + pokemon.type + '</p>');
}
  console.log(pokemon.name + ', Height:' + pokemon.height + ', Type:' + pokemon.type);
}
