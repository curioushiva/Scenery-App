/* Base Url and header for Scenery */
export const SCENERY_API_BASE_URL = `${import.meta.env.VITE_SCENERY_API_BASE_URL}`;
export const SCENERY_API_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_SCENERY_AUTH_TOKEN}`,
};
/* Image url for Scenery - backdrops & posters */
export const IMG_BACKDROP_BASE_URL = `${import.meta.env.VITE_SCENERY_IMAGE_BASE_URL}/w1280`;
export const IMG_POSTER_BASE_URL = `${import.meta.env.VITE_SCENERY_IMAGE_BASE_URL}/w342`;
export const IMG_HERO_BACKDROP_BASE_URL = `${import.meta.env.VITE_SCENERY_IMAGE_BASE_URL}/w780`;
export const IMG_HERO_POSTER_BASE_URL = `${import.meta.env.VITE_SCENERY_IMAGE_BASE_URL}/w500`;
