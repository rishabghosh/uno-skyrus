/* globals createPlayerCard */

const createPlayerDiv = function(document, playerName) {
  const card = createPlayerCard(document, playerName);
  return card;
};

const createPlayersView = function(document, playersCount, playersNames) {
  const playersContainer = document.getElementById('players');
  playersContainer.innerText = '';

  let count = 0;
  while (count < playersCount) {
    const playerDiv = createPlayerDiv(document, playersNames[count]);
    playersContainer.appendChild(playerDiv);
    count++;
  }
};

const getPlayersStatus = function(document) {
  setInterval(() => {
    fetch('/playersStatus')
      .then(response => {
        if (response.redirected) {
          window.location.replace(response.url);
        }
        return response.json();
      })
      .then(json => {
        createPlayersView(document, json.playersCount, json.playersNames);
      });
  }, 1000);
};

window.onload = getPlayersStatus.bind(null, document);