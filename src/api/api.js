const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')
const API_TIMEOUT_MS = 20000

const getApiUrl = (path) => {
    if (!API_BASE_URL) {
        throw new Error('VITE_API_BASE_URL is not configured')
    }

    return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
}

// const getApiUrl = (path) => {
//     return `/${path.replace(/^\/+/, '')}`
// }

const fetchJson = async (
    path,
    options = {},
    fallbackMessage
) => {
    const url = getApiUrl(path)
    const controller = new AbortController()

    let timedOut = false

    const timeoutId = window.setTimeout(() => {
        timedOut = true
        controller.abort()
    }, API_TIMEOUT_MS)

    try {
        let response

        try {
            response = await fetch(url, {
                ...options,
                signal: controller.signal,
            })
        } catch (error) {
            if (timedOut) {
                throw new Error(
                    `${fallbackMessage} : délai d’attente dépassé`
                )
            }

            if (error?.name === 'AbortError') {
                throw new Error(
                    `${fallbackMessage} : requête annulée`
                )
            }

            console.error('[API network error]', {
                url,
                message: error?.message,
            })

            throw new Error(
                `${fallbackMessage} : serveur inaccessible`
            )
        }

        let data

        try {
            data = await response.json()
        } catch (error) {
            if (timedOut || error?.name === 'AbortError') {
                throw new Error(
                    `${fallbackMessage} : délai d’attente dépassé`
                )
            }

            throw new Error(
                `${fallbackMessage} : réponse JSON invalide`
            )
        }

        const backendReturnedError =
            data?.success === false ||
            data?.ok === false ||
            Boolean(data?.error)

        if (!response.ok || backendReturnedError) {
            const apiMessage =
                typeof data?.message === 'string'
                    ? data.message
                    : typeof data?.error === 'string'
                        ? data.error
                        : `${fallbackMessage} (HTTP ${response.status})`

            const apiError = new Error(apiMessage)

            apiError.status = response.status
            apiError.data = data

            throw apiError
        }

        return data
    } finally {
        window.clearTimeout(timeoutId)
    }
}

export async function getConfiguratorDatabyAPI() {
    const data = await fetchJson(
        '/api/xu/getProducts',
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
        'Impossible de charger les données du configurateur'
    )

    const requiredCollections = [
        'parois',
        'receveurs',
        'vipanels',
        'niches',
        'profiles',
    ]

    const invalidCollections = requiredCollections.filter(
        (key) => !Array.isArray(data?.[key])
    )

    if (invalidCollections.length > 0) {
        throw new Error(
            `Données du configurateur invalides : ${invalidCollections.join(', ')}`
        )
    }

    return data
}

export async function sendConfiguratorDatabyAPI(payload) {
    const data = await fetchJson(
        '/api/xu/resultProject',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        },
        'Impossible d’envoyer la configuration'
    )

    if (!data?.img || !data?.pdf || !data?.products) {
        throw new Error('La réponse de visualisation est incomplète')
    }

    return data
}


export async function sendPdfByEmail({
    civility,
    name,
    surname,
    email,
    api_code,
}) {
    let response

    const request = {
        civility: civility,
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        api_code: api_code,
    }

    console.log('[API] POST /api/xu/sendPDFbyMail', request)

    try {
         return await fetchJson(
            '/api/xu/sendPDFbyMail',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            },
            'Impossible d’envoyer le PDF par e-mail'
        )
    } catch (error) {
     
        const isProjectNotFound =
            error?.status === 404 ||
            error?.data?.status === 404

        if (isProjectNotFound) {
            throw new Error(
                'Le projet de configuration n’a pas été créé. ' +
                'Veuillez recréer votre salle de bain dans le configurateur ' +
                'avant de demander l’envoi du PDF par e-mail.'
            )
        }

        throw error
    }
}

 

 