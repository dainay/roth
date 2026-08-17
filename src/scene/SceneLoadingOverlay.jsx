import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

import s from './SceneLoadingOverlay.module.scss';

const HIDE_DELAY = 300;

export default function SceneLoadingOverlay({ forceVisible = false }) {
    const active = useProgress((state) => state.active);
    const progress = useProgress((state) => state.progress);
    const errors = useProgress((state) => state.errors);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const initialLoadingInProgress = forceVisible || active || progress < 100;

    useEffect(() => {
        if (initialLoadComplete || initialLoadingInProgress) return undefined;

        const timeout = window.setTimeout(
            () => setInitialLoadComplete(true),
            HIDE_DELAY,
        );
        return () => window.clearTimeout(timeout);
    }, [initialLoadComplete, initialLoadingInProgress]);

    const isVisible = initialLoadComplete ? active : true;
    const displayedProgress = Math.round(Math.min(100, Math.max(0, progress)));

    return (
        <div
            className={`${s.overlay} ${initialLoadComplete ? s.textureLoading : s.initialLoading} ${isVisible ? s.visible : s.hidden}`}
            aria-hidden={!isVisible}
        >
            {initialLoadComplete ? (
                <div className={s.spinner} role="status" aria-label="Chargement de la texture" />
            ) : (
                <div className={s.content} role="status" aria-live="polite">
                    <div className={s.brandMark}>
                        <img src="./img/Logo-red.svg" alt="Roth" />
                    </div>
                    <span className={s.eyebrow}>Imaginez votre salle de bain</span>
                    <h1>Projet d'espace douche <b>PASTEL</b></h1>
                    <div
                        className={s.progressTrack}
                        role="progressbar"
                        aria-label="Chargement de la scène"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={displayedProgress}
                    >
                        <span style={{ width: `${displayedProgress}%` }} />
                    </div>
                    <p className="text-center"> 
                        {errors.length > 0
                            ? 'Certaines ressources n’ont pas pu être chargées.'
                            : `Le configurateur se met en place pour vous… ${displayedProgress} %`}
                    </p>
                </div>
            )}
        </div>
    );
}
