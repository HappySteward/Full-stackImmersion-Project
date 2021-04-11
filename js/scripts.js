var pokemonRepository = (function () {
  var pokemonList = [
    {
      name: "charmander",
      type: "fire",
      height: "0.6"
    },
    {
      name: "bulbasaur",
      type:["grass","poison"],
      height:"0.7"
    },
    {
      name:"squirtle",
      type:"water",
      height:"0.5"
    }
  ];

  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };
})();


console.log( pokemonRepository.getAll() );
