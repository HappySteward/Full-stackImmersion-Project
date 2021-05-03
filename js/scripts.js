let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerHTML = `<img width="44px" class="sprite" style="float:left;" src="${pokemon.imageUrl}"> <p>${pokemon.name}</p>`;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item, index) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    })
    .then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
  //modal container
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.innerHTML = '';

  // modal
  let modal = document.createElement('div');
  let modalBody = document.createElement('div'); //create body of modal
  modal.classList.add('modal'); /// add class for style

  //add name to body
  let pokemonNameElement = document.createElement('div');
  pokemonNameElement.innerHTML = pokemon.name
  modalBody.appendChild(pokemonNameElement)

  //add close button to modal
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'close';
  //remove class when close button is clicked
  closeButtonElement.addEventListener('click', () => {
  modalContainer.classList.remove('is-visable');
  })

  modal.appendChild(closeButtonElement)

  // add body to modal
  modal.appendChild(modalBody)

  // add modal to container
  modalContainer.appendChild(modal)

  // add class to make modal visible
  modalContainer.classList.add('is-visible');

}

document.querySelector('#show-modal').addEventListener('click',() => {
  showModal();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();

  
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


pokemonRepository.loadList().then(function (pokemon) {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
