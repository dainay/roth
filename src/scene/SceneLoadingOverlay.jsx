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
                        <img src="./img/logo.svg" alt="Roth" />
                    </div>
                    <span className={s.eyebrow}>Configuration de votre espace douche</span>
                    <h1>Configurateur PASTEL</h1>
                    <div
                        className={s.progressTrack}
                        role="progressbar"
                        aria-label="Chargement de la scène 3D"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={displayedProgress}
                    >
                        <span style={{ width: `${displayedProgress}%` }} />
                    </div>
                    <p>
                        {errors.length > 0
                            ? 'Certaines ressources n’ont pas pu être chargées.'
                            : `Chargement de la scène 3D… ${displayedProgress} %`}
                    </p>
                </div>
            )}
        </div>
    );
}
