const songsStore = {
  favorites: [
    'aRZbUYD7'
  ],
  addFavorite: (songId) => {
    songsStore.favorites.push(songId);
  },
  removeFavorite: (songId) => {
    songsStore.favorites = songsStore.favorites.filter((s) => s !== songId);
  },
};

export default songsStore;
