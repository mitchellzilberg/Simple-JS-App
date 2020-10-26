
let pokemonList = [
  {name:'Pikachu', height:2, type:['electric', 'normal']},
  {name:'Bulbasaur', height:8, type:['grass', 'poison']},
  {name:'Charizard', height:15, type:['fire', 'flying']}
];

//Lists all the pokemon with their heights. Adds comment if pokemon is big.
for (let i=0; i <pokemonList.length; i++){
  if (pokemonList[i].height > 10) {
  document.write(pokemonList[i].name + ' (height:' + pokemonList[i].height+') -Wow, thats big!');
  document.write('<br>');
} else {
  document.write(pokemonList[i].name + ' (height:' + pokemonList[i].height+') ');
  document.write('<br>');
  }
}
