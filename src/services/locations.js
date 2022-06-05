import { MAPBOX_TOKEN } from "../config";

/**
 *
 * @param {String} query text to search
 */
export async function searchPlaces(query) {
  console.log(query);
  const encodedQuery = encodeURI(query);
  const mapboxURL = "https://api.mapbox.com";

  const response = await fetch(
    `${mapboxURL}/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true`
  );

  return await response.json();
}
