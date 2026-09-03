export default function modalWindow(productUrl) {
    const width = Math.min(1200, window.screen.availWidth - 80)
    const height = Math.min(850, window.screen.availHeight - 80)

    const left = Math.round(
        (window.screen.availWidth - width) / 2
    )

    const top = Math.round(
        (window.screen.availHeight - height) / 2
    )

    const productWindow = window.open(
        productUrl,
        'roth-product',
        [
            'popup=yes',
            `width=${width}`,
            `height=${height}`,
            `left=${left}`,
            `top=${top}`,
            'resizable=yes',
            'scrollbars=yes',
        ].join(',')
    )

    if (!productWindow) {
        console.error(
            'The product window was blocked by the browser'
        )

        return
    }

    productWindow.focus()
}