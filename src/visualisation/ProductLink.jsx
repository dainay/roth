import { useEffect, useRef, useState } from 'react'
import './ProductLink.css'

export default function ProductLink({
    url,
    title = 'Produit Roth',
    children = 'Voir le produit',
}) {
    const dialogRef = useRef()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const dialog = dialogRef.current

        if (!dialog) return

        if (isOpen && !dialog.open) {
            dialog.showModal()
        }

        if (!isOpen && dialog.open) {
            dialog.close()
        }
    }, [isOpen])

    const openProduct = () => {
        if (!url) return

        setIsOpen(true)
    }

    const closeProduct = () => {
        setIsOpen(false)
    }

    return (
        <>
            <button
                type="button"
                className="btn-product"
                onClick={openProduct}
                disabled={!url}
            >
                {children}
            </button>

            <dialog
                ref={dialogRef}
                className="product-link-dialog"
                onCancel={(event) => {
                    event.preventDefault()
                    closeProduct()
                }}
                onClose={closeProduct}
            >
                <header className="product-link-header">
                    <span className="product-link-title">
                        {title}
                    </span>

                    <button
                        type="button"
                        className="product-link-close"
                        onClick={closeProduct}
                        aria-label="Fermer la page produit"
                    >
                        Fermer ×
                    </button>
                </header>

                <div className="product-link-content">
                    {isOpen && (
                        <iframe
                            src={url}
                            title={title}
                            className="product-link-iframe"
                           
                        />
                    )}
                </div>
            </dialog>
        </>
    )
}