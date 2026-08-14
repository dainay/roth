export async function getConfiguratorDatabyAPI() {
    const response = await fetch(
        'https://testwww.roth-france.fr/api/xu/getProducts',
        // '/api/xu/getProducts',
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    )

    if (!response.ok) {
        throw new Error('Impossible de charger les données du configurateur')
    }

    return response.json()
}

export async function sendConfiguratorDatabyAPI(payload) {

    // console.log('payload sent to API:', payload)

    const response = await fetch(
        'https://testwww.roth-france.fr/api/xu/resultProject',
        // '/api/xu/resultProject',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })


    if (!response.ok) {
        throw new Error('Impossible d’envoyer la configuration')
    }

    console.log('response from API:', response)

    return response
}