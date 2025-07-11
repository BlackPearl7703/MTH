export async function fetchFavoritesSongsData(favorites) {
    const apiEndpoint = "https://saavn.dev/api/songs?ids=";
  const fetchedSongs = [];
//   const favorites = new Set(
//     JSON.parse(localStorage.getItem("favorites")) || []
//   );

  for (const id of favorites) {
    try {
      console.log(`${apiEndpoint}${encodeURIComponent(id)}`);
      const response = await fetch(
        `${apiEndpoint}${encodeURIComponent(id)}`
      );
      const data1 = await response.json();
      const data = data1.data;
      console.log("Fetched data for favorite:", id, data1);
      if (data.length > 0) {
            // Add the first matching result
            fetchedSongs.push(data[0]);
          }
        } catch (error) {
          console.error("Error fetching favorite:", id, error);
        }
      }
      return fetchedSongs;
}
