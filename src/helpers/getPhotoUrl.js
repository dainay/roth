const PHOTOS_BASE_URL = import.meta.env.VITE_PHOTOS_BASE_URL?.replace(/\/+$/, '')
const SITE_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

const appendPath = (baseUrl, path) => {
  if (!baseUrl || !path) return null

  if (/^https?:\/\//i.test(path)) return path

  return `${baseUrl}/${String(path).replace(/^\/+/, '')}`
}

export const getPhotoUrl = (fileName) => {
  return appendPath(PHOTOS_BASE_URL, fileName)
}

export const getProductUrl = (productCode) => {
  if (!productCode) return null

  return appendPath(
    SITE_BASE_URL,
    `catalogue/produit/${encodeURIComponent(productCode)}`
  )
}
