const FAKE_ENDPOINT_DELAY = 600;

const wait = (milliseconds) => new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
});

export const sendPdfByEmailFake = async ({ name, email, pdf }) => {
    const request = {
        name: name.trim(),
        email: email.trim(),
        pdf,
    };

    if (!request.name || !request.email || !request.pdf) {
        throw new Error('Les informations nécessaires sont incomplètes.');
    }

    await wait(FAKE_ENDPOINT_DELAY);

    console.info('[fake endpoint] POST /api/email/pdf', request);

    return {
        ok: true,
        message: 'Votre récapitulatif a bien été envoyé.',
    };
};
