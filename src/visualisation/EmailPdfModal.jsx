import { useEffect, useRef, useState } from 'react'

import { sendPdfByEmail } from '../api/api'
import s from './EmailPdfModal.module.scss'
import useConfiguratorStore from '../store/useConfiguratorStore'

import {FEATURES} from '../conf/appMode'

const EmailPdfModal = ({ pdf, onClose }) => {
    const dialogRef = useRef(null)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [civility, setCivility] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState('')

    const api_code = useConfiguratorStore((state) => state.api_code)

    useEffect(() => {
        const dialog = dialogRef.current

        if (dialog && !dialog.open) {
            dialog.showModal()
        }

        return () => {
            if (dialog?.open) {
                dialog.close()
            }
        }
    }, [])

    const handleClose = () => {
        if (status !== 'submitting') {
            onClose()
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        handleClose()
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose()
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setStatus('submitting')
        setError('')

        try {
            await sendPdfByEmail({ name, surname, civility, email, pdf, api_code })
            setStatus('success')

            if (FEATURES.reloadAfterMail) {
                setTimeout(() => {
                    window.location.reload()
                }, 10000)
            }

        } catch (error) {
            console.error('[E-mail] Erreur d’envoi du PDF :', error)

            setError(
                error instanceof Error
                    ? error.message
                    : 'Une erreur est survenue. Veuillez réessayer.'
            )

            setStatus('idle')
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className={s.dialog}
            aria-labelledby="email-pdf-title"
            onCancel={handleCancel}
            onClick={handleBackdropClick}
          
        >
            <section className={s.modal}
              style={FEATURES.dialogHiger && { transform: 'translate(-50%, -78%)' }} 
              >
                <button
                    type="button"
                    className={s.closeButton}
                    onClick={handleClose}
                    aria-label="Fermer la fenêtre"
                    disabled={status === 'submitting'}
                >
                    ×
                </button>

                {status === 'success' ? (
                    <div className={s.success} role="status">
                         
                        <h2>E-mail envoyé</h2>

                        <p className="text">
                            Votre récapitulatif a bien été envoyé à{' '}
                            <b>{email.trim()}</b>. 
                        </p>
                        <p className="text">Cette page sera actualisée automatiquement dans quelques secondes.</p>

                        <button
                            type="button"
                            className={`${s.primaryButton} btn`}
                            onClick={handleClose}
                        >
                            Fermer
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 >
                            Recevoir mon récapitulatif
                        </h2>

                        <p className="text">
                            Indiquez vos coordonnées pour recevoir votre PDF
                            par e-mail.
                        </p>

                        <form className={s.form} onSubmit={handleSubmit}>
                            <label htmlFor="customer-civility">Civilité</label>
                            <select
                                id="customer-civility"
                                name="civility"
                                value={civility}
                                onChange={(event) => setCivility(event.target.value)}
                                required
                                disabled={status === 'submitting'}
                            >
                                <option value="">Sélectionner</option>
                                <option value="M.">M.</option>
                                <option value="Mme">Mme</option>
                            </select>

                            <label htmlFor="customer-surname">Nom</label>
                            <input
                                id="customer-surname"
                                name="surname"
                                type="text"
                                value={surname}
                                onChange={(event) => setSurname(event.target.value)}
                                autoComplete="family-name"
                                required
                                autoFocus
                                disabled={status === 'submitting'}
                            />

                            <label htmlFor="customer-name">Prénom</label>
                            <input
                                id="customer-name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="given-name"
                                required
                                autoFocus
                                disabled={status === 'submitting'}
                            />

                            <label htmlFor="customer-email">E-mail</label>
                            <input
                                id="customer-email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                                disabled={status === 'submitting'}
                            />
                            <p className={s.privacyNotice}>
                                Vos données sont utilisées par Roth France uniquement pour vous
                                envoyer votre récapitulatif. Consultez notre{' '}
                                <a
                                    href="https://testwww.roth-france.fr/politique-confidentialite"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    politique de confidentialité
                                </a>.
                            </p>

                            {error && (
                                <p className={s.error} role="alert">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className={`${s.primaryButton} btn`}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting'
                                    ? 'Envoi en cours…'
                                    : 'Envoyer mon PDF'}
                            </button>
                        </form>
                    </>
                )}
            </section>
        </dialog>
    )
}

export default EmailPdfModal