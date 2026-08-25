import { Component } from 'react'

export default class ErrorBoundary extends Component {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error) {
        console.error('[Application] Erreur inattendue :', error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="app-error" role="alert">
                    <div className="app-error__card">
                        <h1>Impossible d’afficher le configurateur</h1>
                        <p>Une erreur inattendue est survenue.</p>
                        <button type="button" onClick={() => window.location.reload()}>
                            Réessayer
                        </button>
                    </div>
                </main>
            )
        }

        return this.props.children
    }
}