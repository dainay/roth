import React from 'react';
import useConfiguratorStore from '../store/useConfiguratorStore';
import { VIPANEL_TEXTURES, RECEVEUR_TEXTURES, SHOWER_TYPES, FINITIONS } from '../conf/textures'

import Button from './components/Button';

export default function UI() {
    const finition = useConfiguratorStore((state) => state.finition);
    const setFinition = useConfiguratorStore((state) => state.setFinition);

    const profile = useConfiguratorStore((state) => state.profile);
    const setProfile = useConfiguratorStore((state) => state.setProfile);

    const niche = useConfiguratorStore((state) => state.niche);
    const setNiche = useConfiguratorStore((state) => state.setNiche);

    const wall = useConfiguratorStore((state) => state.wall);
    const setWall = useConfiguratorStore((state) => state.setWall);

    const vipanelleft = useConfiguratorStore((state) => state.vipanelleft);
    const setVipanelLeft = useConfiguratorStore((state) => state.setVipanelLeft);

    const vipanelright = useConfiguratorStore((state) => state.vipanelright);
    const setVipanelRight = useConfiguratorStore((state) => state.setVipanelRight);

    const vipanelniche = useConfiguratorStore((state) => state.vipanelniche);
    const setVipanelNiche = useConfiguratorStore((state) => state.setVipanelNiche);

    const receveur = useConfiguratorStore((state) => state.receveur);
    const setReceveur = useConfiguratorStore((state) => state.setReceveur);

    const shower = useConfiguratorStore((state) => state.shower);
    const setShower = useConfiguratorStore((state) => state.setShower);

    const serigraphie = useConfiguratorStore((state) => state.serigraphie);
    const setSerigraphie = useConfiguratorStore((state) => state.setSerigraphie);

    const finitions = useConfiguratorStore((state) => state.finitions);
    const setFinitions = useConfiguratorStore((state) => state.setFinitions);

    return (
        <div>
            <h1>UI Component</h1>
            <div>
                <h2>Receveur</h2>

                {RECEVEUR_TEXTURES.map((item) => (
                    <Button
                        key={item.id}
                        active={receveur === item.id}
                        onClick={() => setReceveur(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div>
                <h2>Vipanel gauche</h2>

                {VIPANEL_TEXTURES.map((item) => (
                    <Button
                        key={item.id}
                        active={vipanelleft === item.id}
                        onClick={() => setVipanelLeft(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            <div>
                <h2>Vipanel droite</h2>

                {VIPANEL_TEXTURES.map((item) => (
                    <Button
                        key={item.id}
                        active={vipanelright === item.id}
                        onClick={() => setVipanelRight(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            <div>
                <h2>Type de porte</h2>

                {SHOWER_TYPES.map((item) => (
                    <Button
                        key={item.id}
                        active={shower === item.id}
                        onClick={() => setShower(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            <div>
                <h2>Montage</h2>
                <Button
                    active={wall}
                    onClick={() => setWall(true)} 
                >
                   En niche
                </Button>
                <Button
                    active={wall}
                    onClick={() => setWall(false)}
                >
                   Avec paroi fixe
                </Button>
            </div>

            <div>
                <h2>Niche dans l'espace douche</h2>
                <Button
                    active={niche}
                    onClick={() => setNiche(true)}
                >
                    Oui
                </Button>
                 <Button
                    active={niche}
                    onClick={() => setNiche(false)}
                >
                    Oui
                </Button>
            </div>

             <div>
                <h2>Serigraphie</h2>
                <Button
                    active={serigraphie}
                    onClick={() => setSerigraphie(true)}
                >
                    Oui
                </Button>
                 <Button
                    active={serigraphie}
                    onClick={() => setSerigraphie(false)}
                >
                    Non
                </Button>
            </div>

            <div>
                <h2>Finition</h2>

                {FINITIONS.map((item) => (
                    <Button
                        key={item.id}
                        active={finition === item.id}
                        onClick={() => setFinition(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div> 

            
        </div>
    );
}
