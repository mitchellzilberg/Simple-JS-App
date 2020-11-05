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

    // Adds pokemon to list as a button
    function addListItem(pokemon) {
      let pokemonList = $('.pokemon-list');
      let listPokemon = $('<li></li>');
      let button = $('<button>' + pokemon.name + '</button>');
      button.addClass('button-style');
      button.attr("data-toggle", "modal");
      button.attr("data-target", "#modal-container");
      pokemonList.append(listPokemon);
      listPokemon.append(button);
      // calls showDetails when button is clicked
      button.on('click', function(event){
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
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // adds the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    //shows details of each pokemonList object
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon);
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

// -------------------END OF IIE------------------------

//fetches from API + forEach loop
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

// Shows Modal when you click on a button
function showModal(pokemon) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $('<h1>' + pokemon.name + '</h1>');

  let imageElement = $('<img class="modal-img" style="width:50%">');
  imageElement.attr('src', pokemon.imageUrl);

  let heightElement = $('<p>' + 'height:' + pokemon.height + '</p>');

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
}
