import React from 'react';
import { useState } from 'react'
import s from './UI.module.scss'
import useConfiguratorStore from '../store/useConfiguratorStore';
import { TRYPTICH_TEXTURES, NICHES, VIPANEL_TEXTURES, RECEVEUR_TEXTURES, SHOWER_TYPES, FINITIONS, PROFILES } from '../conf/textures'

import Button from './components/Button';

export default function UI() {
    const [activeVipanelZone, setActiveVipanelZone] = useState('left')

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

    const nicheColor = useConfiguratorStore((state) => state.nicheColor);
    const setNicheColor = useConfiguratorStore((state) => state.setNicheColor);

    const setTryptichLeft = useConfiguratorStore((state) => state.setTryptichLeft);
    const setTryptichRight = useConfiguratorStore((state) => state.setTryptichRight);
    const tryptichLeft = useConfiguratorStore((state) => state.tryptichLeft);
    const tryptichRight = useConfiguratorStore((state) => state.tryptichRight);

    const vipanelZones = [
        {
            id: 'left',
            label: 'Gauche',
            value: vipanelleft,
            setValue: setVipanelLeft,
        },
        {
            id: 'niche',
            label: 'Espace douche',
            value: vipanelniche,
            setValue: setVipanelNiche,
        },
        {
            id: 'right',
            label: 'Droite',
            value: vipanelright,
            setValue: setVipanelRight,
        }, 
        {
            id: 'tryptich',
            label: 'Tryptich' 
        },
    ]

    console.log('TRYPTICH LOG', tryptichLeft, tryptichRight)

    const activeZone = vipanelZones.find((zone) => zone.id === activeVipanelZone)

    return (
        <div className={s.uiWrapper}>
            <div className={s.blockButtons}>
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

            <div className={s.blockButtons}>
                <h2>Montage</h2>
                <Button
                    active={wall}
                    onClick={() => setWall(true)}
                >
                    En niche
                </Button>
                <Button
                    active={!wall}
                    onClick={() => setWall(false)}
                >
                    Avec paroi fixe
                </Button>
            </div>


            <div className={s.blockButtons}>
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



            <div className={s.blockButtons}>
                <h2>Niche dans l'espace douche</h2>
                <Button
                    active={niche}
                    onClick={() => setNiche(true)}
                >
                    Oui
                </Button>
                <Button
                    active={!niche}
                    onClick={() => setNiche(false)}
                >
                    Non
                </Button>
            </div>

             <div className={s.blockButtons}>
                <h2>Couleur de la niche</h2>

                {NICHES.map((item) => (
                    <Button
                        key={item.id}
                        active={nicheColor === item.id}
                        onClick={() => setNicheColor(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            <div className={s.blockButtons}>
                <h2>Serigraphie</h2>
                <Button
                    active={serigraphie}
                    onClick={() => setSerigraphie(true)}
                >
                    Oui
                </Button>
                <Button
                    active={!serigraphie}
                    onClick={() => setSerigraphie(false)}
                >
                    Non
                </Button>
            </div>


            <div className={s.blockButtons}>
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



            <div className={`${s.blockButtons} ${s.blockButtonsVipanel}`}>
                <h2>Vipanel</h2>

                <div className={s.vipanelTabs}>
                    {vipanelZones.map((zone) => (
                        <button
                            key={zone.id}
                            type="button"
                            className={`${s.vipanelTab} ${activeVipanelZone === zone.id ? s.vipanelTabActive : ''
                                }`}
                            onClick={() => setActiveVipanelZone(zone.id)}
                        >
                            {zone.label}
                        </button>
                    ))}
                </div>

                {activeVipanelZone === 'tryptich' ? (
                    <div  >
                        <div>
                            <h3>Mur gauche</h3>
                            {TRYPTICH_TEXTURES.map((item) => (
                            <Button
                                className={`${s.vipanelButton} ${tryptichLeft === item.id ? s.vipanelButtonActive : ''
                                    }`}
                                key={item.id}
                                active={tryptichLeft === item.id}
                                onClick={() => setTryptichLeft(item.id)}
                            >
                                <div className={s.imgVipanelWrapper}>
                                    <img
                                        className={s.imgVipanel}
                                        src={item.url}
                                        alt={item.label}
                                    />
                                </div>

                                <span>{item.label}</span>
                            </Button>
                        ))}
                        </div>
                        <div>
                            <h3>Mur droit</h3>
                            {TRYPTICH_TEXTURES.map((item) => (
                            <Button
                                className={`${s.vipanelButton} ${tryptichRight === item.id ? s.vipanelButtonActive : ''
                                    }`}
                                key={item.id}
                                active={tryptichRight === item.id}
                                onClick={() => setTryptichRight(item.id)}
                            >
                                <div className={s.imgVipanelWrapper}>
                                    <img
                                        className={s.imgVipanel}
                                        src={item.url}
                                        alt={item.label}
                                    />
                                </div>

                                <span>{item.label}</span>
                            </Button>
                        ))}
                        </div>
                        
                    </div>
                ) : (
                    <div className={s.vipanelGrid}>
                        {VIPANEL_TEXTURES.map((item) => (
                            <Button
                                className={`${s.vipanelButton} ${activeZone.value === item.id ? s.vipanelButtonActive : ''
                                    }`}
                                key={item.id}
                                active={activeZone.value === item.id}
                                onClick={() => activeZone.setValue(item.id)}
                            >
                                <div className={s.imgVipanelWrapper}>
                                    <img
                                        className={s.imgVipanel}
                                        src={item.url}
                                        alt={item.label}
                                    />
                                </div>

                                <span>{item.label}</span>
                            </Button>
                        ))}
                    </div>
                )}
            </div>



            <div className={s.blockButtons}>
                <h2>Profile</h2>

                {PROFILES.map((item) => (
                    <Button
                        key={item.id}
                        active={profile === item.id}
                        onClick={() => setProfile(item.id)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

           


        </div>
    );
}
