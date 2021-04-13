let pokemonRepository = (function () {
  let repository = [
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

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon
  ) {
  repository.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
function getAll() {
    return repository;
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
