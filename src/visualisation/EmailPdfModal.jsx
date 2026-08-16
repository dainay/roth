import { useEffect, useId, useRef, useState } from 'react';

import { sendPdfByEmailFake } from '../api/email';

import s from './EmailPdfModal.module.scss';

const EmailPdfModal = ({ pdf, onClose }) => {
    const titleId = useId();
    const nameId = useId();
    const emailId = useId();
    const modalRef = useRef(null);
    const nameInputRef = useRef(null);
    const successButtonRef = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    useEffect(() => {
        nameInputRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusableElements = modalRef.current?.querySelectorAll(
                'button:not([disabled]), input:not([disabled])',
            );

            if (!focusableElements?.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (status === 'success') {
            successButtonRef.current?.focus();
        }
    }, [status]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('submitting');
        setError('');

        try {
            await sendPdfByEmailFake({ name, email, pdf });
            setStatus('success');
        } catch (submissionError) {
            console.error('[E-mail] Erreur d’envoi du PDF :', submissionError)
            setError(submissionError.message || 'Une erreur est survenue. Veuillez réessayer.');
            setStatus('idle');
        }
    };

    const handleBackdropMouseDown = (event) => {
        if (event.target === event.currentTarget && status !== 'submitting') {
            onClose();
        }
    };

    return (
        <div className={s.backdrop} onMouseDown={handleBackdropMouseDown}>
            <section
                ref={modalRef}
                className={s.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <button
                    type="button"
                    className={s.closeButton}
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                    disabled={status === 'submitting'}
                >
                    ×
                </button>

                {status === 'success' ? (
                    <div className={s.success} role="status">
                        <div className={s.successIcon} aria-hidden="true">✓</div>
                        <h2 id={titleId}>E-mail envoyé</h2>
                        <p>Votre récapitulatif a bien été envoyé à {email.trim()}.</p>
                        <button
                            ref={successButtonRef}
                            type="button"
                            className={s.primaryButton}
                            onClick={onClose}
                        >
                            Fermer
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 id={titleId}>Recevoir mon récapitulatif</h2>
                        <p className={s.intro}>Indiquez vos coordonnées pour recevoir votre PDF par e-mail.</p>

                        <form className={s.form} onSubmit={handleSubmit}>
                            <label htmlFor={nameId}>Nom</label>
                            <input
                                ref={nameInputRef}
                                id={nameId}
                                name="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="name"
                                required
                                disabled={status === 'submitting'}
                            />

                            <label htmlFor={emailId}>E-mail</label>
                            <input
                                id={emailId}
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                                disabled={status === 'submitting'}
                            />

                            {error && <p className={s.error} role="alert">{error}</p>}

                            <button
                                type="submit"
                                className={s.primaryButton}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer mon PDF'}
                            </button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
};

export default EmailPdfModal;
