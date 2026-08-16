const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not configured')
}

const getApiUrl = (path) => `${API_BASE_URL}/${path.replace(/^\/+/, '')}`

const throwApiPayloadError = (data) => {
    const status = Number(data?.status)
    const hasErrorStatus = Number.isFinite(status) && (status < 200 || status >= 300)
    const payloadError = data?.error ?? data?.errors ?? (
        hasErrorStatus || data?.success === false || data?.ok === false
            ? data?.message ?? data
            : null
    )

    if (!payloadError) return

    const errorDetails = Array.isArray(payloadError)
        ? payloadError.map((item) => item?.message ?? String(item)).join(', ')
        : payloadError
    const message = typeof errorDetails === 'string'
        ? errorDetails
        : errorDetails.message ?? JSON.stringify(errorDetails)

    const apiError = new Error(message || 'Erreur retournée par l’API')
    apiError.name = data?.name ?? data?.code ?? 'ApiResponseError'
    apiError.status = data?.status
    apiError.details = data
    apiError.alreadyLogged = true

    console.error('[API] Erreur backend :', data)
    throw apiError
}

const parseJsonResponse = async (response, errorMessage) => {
    let data
    try {
        data = await response.json()
    } catch (error) {
        const jsonError = new Error(
            `${errorMessage} : réponse JSON invalide`,
            { cause: error }
        )
        jsonError.name = 'InvalidJsonResponseError'
        jsonError.alreadyLogged = true
        console.error('[API] JSON invalide :', jsonError)
        throw jsonError
    }

    if (!response.ok) {
        const responseError = new Error(
            data?.message ?? `${errorMessage} (${response.status} ${response.statusText})`
        )
        responseError.name = data?.name ?? data?.code ?? 'ApiResponseError'
        responseError.status = response.status
        responseError.details = data
        responseError.alreadyLogged = true
        console.error('[API] Erreur backend :', data)
        throw responseError
    }

    return data
}

export async function getConfiguratorDatabyAPI() {
    const response = await fetch(
        getApiUrl('/api/xu/getProducts'),
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    )

    const data = await parseJsonResponse(
        response,
        'Impossible de charger les données du configurateur'
    )
    throwApiPayloadError(data)

    const requiredCollections = [
        'parois',
        'receveurs',
        'vipanels',
        'niches',
        'profiles',
    ]

    if (
        !data ||
        typeof data !== 'object' ||
        requiredCollections.some(
            (key) => !Array.isArray(data[key]) || data[key].length === 0
        )
    ) {
        throw new Error('Les données du configurateur sont incomplètes')
    }

    return data
}

export async function sendConfiguratorDatabyAPI(payload) {
    const response = await fetch(
        getApiUrl('/api/xu/resultProject'),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })


    const data = await parseJsonResponse(
        response,
        'Impossible d’envoyer la configuration'
    )
    throwApiPayloadError(data)

    const productCollections = [
        'parois',
        'receveur',
        'profile',
        'niches',
        'vipanels',
    ]
    const invalidFields = []

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        invalidFields.push('response')
    } else {
        if (typeof data.img !== 'string' || !data.img.trim()) invalidFields.push('img')
        if (typeof data.pdf !== 'string' || !data.pdf.trim()) invalidFields.push('pdf')
        if (!data.products || typeof data.products !== 'object' || Array.isArray(data.products)) {
            invalidFields.push('products')
        }
    }

    if (invalidFields.length > 0) {
        const responseError = new Error(
            `La réponse de visualisation est incomplète : ${invalidFields.join(', ')}`
        )
        responseError.name = 'IncompleteVisualizationResponseError'
        responseError.invalidFields = invalidFields
        responseError.alreadyLogged = true
        console.error('[API] Champs manquants dans la réponse :', responseError)
        throw responseError
    }

    const products = Object.fromEntries(
        productCollections.map((key) => [
            key,
            Array.isArray(data.products[key])
                ? data.products[key].filter(
                    (product) => product && typeof product === 'object' && !Array.isArray(product)
                )
                : [],
        ])
    )

    return {
        ...data,
        products: {
            ...data.products,
            ...products,
        },
    }
}
