let pokemonRepository = (function() {
  let t = [],
    n = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function e(n) {
    t.push(n);
  }
  function o(t) {
    let n = t.detailsUrl;
    return fetch(n)
      .then(function(t) {
        return t.json();
      })
      .then(function(n) {
        (t.imageUrl = n.sprites.front_default),
          (t.height = n.height),
          (t.types = n.types);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  function i(t) {
    o(t).then(function() {
      !(function(t) {
        let n = $('.modal-body'),
          e = $('.modal-title');
        e.empty(), n.empty();
        let o = $('<h1>' + t.name + '</h1>'),
          i = $('<img class="modal-img" style="width:50%">');
        i.attr('src', t.imageUrl);
        let a = $('<p>height:' + t.height + '</p>');
        e.append(o), n.append(i), n.append(a);
      })(t);
    });
  }
  return {
    add: e,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let n = $('.pokemon-list'),
        e = $('<li></li>'),
        o = $('<button>' + t.name + '</button>');
      o.addClass('button-style'),
        o.attr('data-toggle', 'modal'),
        o.attr('data-target', '#modal-container'),
        n.append(e),
        e.append(o),
        o.on('click', function() {
          i(t);
        });
    },
    loadList: function() {
      return fetch(n)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            e({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: o,
    showDetails: i
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
