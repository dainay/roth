const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function getConfiguratorDatabyAPI() {
    const response = await fetch(`${API_BASE_URL}/api/breeds/image/random/3`)

    if (!response.ok) {
        throw new Error('Impossible de charger les données du configurateur')
    }

    return response.json()
}

export async function sendConfiguratorDatabyAPI(payload) {
    const response = await fetch(`${API_BASE_URL}/api/configurator/pastel/selection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Impossible d’envoyer la configuration')
    }

    return response.json()
}