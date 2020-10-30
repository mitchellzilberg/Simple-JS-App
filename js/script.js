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

    // Modal creation
    let modalContainer = document.querySelector('#modal-container');

    //Shows Modal when li is clicked and hides it when function is executed
    function showModal(pokemon) {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);


      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer){
          hideModal();
        }
      });

      // Elements inside Modal
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      let contentElement = document.createElement('p');
      contentElement.innerText = 'height:' + pokemon.height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(imageElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content');
    });

  //returns functions
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
      hideModal: hideModal,
      showDetails: showDetails
    };
})();

//fetches from API + forEach loop
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
