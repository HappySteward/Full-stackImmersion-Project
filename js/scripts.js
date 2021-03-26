pokemonList=[
  {name: "charmander", type: "fire", height: "0.6"},
  {name: "bulbasaur", type:["grass","poison"], height:"0.7"},
  {name:"squirtle", type:"water",height:"0.5"}
]

let pokemonSizeThreshold = 0.7;

for(let i = 0; i <= pokemonList.length; i++){
  let pokemonString = `${pokemonList[i].name} ( height: ${ pokemonList[i].height} )`;
  let pokemon = pokemonList[i].height >= pokemonSizeThreshold ? `<P> ${pokemonString} - Wow, that's big! </p>` : `<p> ${pokemonString} </p>`;
  document.write(pokemon);
}
