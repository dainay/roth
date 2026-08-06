const PHOTOS_BASE_URL =
  import.meta.env.VITE_PHOTOS_BASE_URL

export const getPhotoUrl = (fileName) => {
  if (!fileName) return null

  return `${PHOTOS_BASE_URL}/${fileName}`
}