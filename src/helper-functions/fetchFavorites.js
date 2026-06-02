export async function fetchFavoritesSongsData(favorites) {
  const apiEndpoint = "https://saavn.sumit.co/api/songs/";
  const fetchedSongs = [];

  for (const id of favorites) {
    try {
      const response = await fetch(`${apiEndpoint}${encodeURIComponent(id)}`);
      const data1 = await response.json();
      const data = data1.data;
      if (data.length > 0) {
        // Add the first matching result
        fetchedSongs.push(data[0]);
      }
    } catch (error) {
      console.error("Error fetching favorite:::", id, error);
    }
  }
  return fetchedSongs;
}
