//Pokemon list and functions in IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    {name:'Balbasaur', height: 6, type:['grass', 'poison']},
    {name:'Squirtle', height: 15, type:['water']},
    {name:'Pikachu', height: 5, type:['electric']},
    {name:'Charmander', height: 12, type:['fire', 'flying']},
    {name:'Caterpie', height: 1, type:['bug', 'grass']},
  ];
  //adds pokemon to pokemonList function if typeof is object
    function add(pokemon) {
      if (typeof pokemon === 'object'
      // **NOT WORKING NEED HELP**
      // && Object.keys(pokemonList) === true
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
  //adds pokemon to list as a button
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-style');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      //calls showDetails when button is clicked
      button.addEventListener('click', function(event){
        showDetails(pokemon);
      });
    }
    //shows details of each pokemonList object
    function showDetails(pokemon) {
      console.log(pokemon);
    }
  //returns functions
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
  };
})();

// pokemonRepository.add({name:'Pichu', height: 12, type:['fire', 'flying']},);
console.log(pokemonRepository.getAll());

//retrieves all items from pokemonList and passes them through foreach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
