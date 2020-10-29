//Pokemon list and functions in IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //adds pokemon to pokemonList function if typeof is object
    function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push(pokemon);
      } else {
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
      let listPokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-style');
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      //calls showDetails when button is clicked
      button.addEventListener('click', function(event){
        showDetails(pokemon);
      });
    }
    //Gets pokemon list from API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    //fetches pokemon details from api
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
    //shows details of each pokemonList object
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        console.log(pokemon);
      });
    }
  //returns functions
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

//fetches from API + forEach loop
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
