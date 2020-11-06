let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    t.push(e);
  }
  function o(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = []);
        for (let n = 0; n < e.types.length; n++)
          t.types.push(e.types[n].type.name);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  function i(t) {
    o(t).then(function() {
      !(function(t) {
        let e = $('.modal-body'),
          n = $('.modal-title');
        n.empty(), e.empty();
        let o = $(`<h1> ${t.name} </h1>`),
          i = $('<img class="modal-img">');
        i.attr('src', t.imageUrl);
        let a = $('<p>height:' + t.height + '</p>'),
          l = $('<p>type:' + t.types + '</p>');
        n.append(o), e.append(i), e.append(a), e.append(l);
      })(t);
    });
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = $('.pokemon-list'),
        n = $('<li></li>'),
        o = $('<button>' + t.name + '</button>');
      o.addClass('button-style'),
        o.attr('data-toggle', 'modal'),
        o.attr('data-target', '#modal-container'),
        e.append(n),
        n.append(o),
        o.on('click', function() {
          i(t);
        });
    },
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
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
