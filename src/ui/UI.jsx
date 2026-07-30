import React from 'react';
import { useState } from 'react'
import s from './UI.module.scss'
import useConfiguratorStore from '../store/useConfiguratorStore';
import { SERIGRAPHIE, TRYPTICH_TEXTURES, NICHES, VIPANEL_TEXTURES, RECEVEUR_TEXTURES, SHOWER_TYPES, FINITIONS, PROFILES } from '../conf/textures'

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

    const setTriptychLeft = useConfiguratorStore((state) => state.setTriptychLeft);
    const setTriptychRight = useConfiguratorStore((state) => state.setTriptychRight);
    const triptychLeft = useConfiguratorStore((state) => state.triptychLeft);
    const triptychRight = useConfiguratorStore((state) => state.triptychRight);

    const vipanelZones = [
        {
            id: 'left',
            label: 'Mur gauche',
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
            label: 'Mur droit',
            value: vipanelright,
            setValue: setVipanelRight,
        },
        {
            id: 'triptych',
            label: 'Décor triptyque'
        },
    ]

    const activeZone = vipanelZones.find((zone) => zone.id === activeVipanelZone)

    return (
        <div className={s.uiWrapper}>
            <div className={s.blockButtons}>
                <h2>Type d’installation</h2>

                {SHOWER_TYPES.map((item) => (
                    <Button
                        data-shower={item.id}
                        key={item.id}
                        active={shower === item.id}
                        className={`${s.showerIcon} ${shower === item.id ? s.showerIconActive : ''
                            }`}
                        onClick={() => setShower(item.id)}
                    >
                        <img className={s.showerIcon} src={item.icon} alt={item.label} />
                        {item.label}
                    </Button>
                ))}
            </div>
            {shower !== 'f' && (
                <div className={s.blockButtons}>
                    <h2>Type d’installation</h2>
                    <Button 
                        className={s.buttonNormal}
                        active={wall}
                        onClick={() => setWall(true)}
                    >
                        En niche
                    </Button>
                    <Button 
                        className={s.buttonNormal}
                        active={!wall}
                        onClick={() => setWall(false)}
                    >
                        Avec paroi fixe
                    </Button>
                </div>
            )}


            <div className={s.blockButtons}>
                <h2>Finition du profilé</h2>

                {FINITIONS.map((item) => (
                    <Button
                        data-finition={item.id}
                        key={item.id}
                        active={finition === item.id}
                        className={`${s.vipanelButton} ${finition === item.id ? s.finitionButtonActive : ''
                            }`}
                        onClick={() => setFinition(item.id)}
                    >
                        <img className={s.finitionImage} src={item.url} alt={item.label} />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </div>

            <div className={s.blockButtons}>
                <h2>Niche dans l'espace douche</h2>

                {NICHES.map((item) => (

                    <Button

                        key={item.id}
                        data-niche={item.id}
                        active={nicheColor === item.id}
                        className={`${s.vipanelButton} ${nicheColor === item.id ? s.finitionButtonActive : ''
                            }`}
                        onClick={() => setNicheColor(item.id)}
                    >
                        <img className={s.finitionImage} src={item.url} alt={item.label} />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </div>

            {shower === 'f' && (
                <div className={s.blockButtons}>
                    <h2>Sérigraphie</h2>
                    {SERIGRAPHIE.map((item) => (

                        <Button
                            data-serigraphie={item.id}
                            key={item.id}
                            active={serigraphie === item.id}
                            className={`${s.vipanelButton} ${serigraphie === item.id ? s.finitionButtonActive : ''
                                }`}
                            onClick={() => setSerigraphie(item.id)}
                        >
                            <img className={s.finitionImage} src={item.url} alt={item.label} />
                            <span>{item.label}</span>
                        </Button>
                    ))}
                </div>
            )}

            <div className={s.blockButtons}>
                <h2>Finition du receveur</h2>

                {RECEVEUR_TEXTURES.map((item) => (

                    <Button
                        data-receveur={item.id}
                        className={`${s.vipanelButton} ${receveur.value === item.id ? s.vipanelButtonActive : ''}`}
                        key={item.id}
                        active={receveur.value === item.id}
                        onClick={() => setReceveur({ value: item.id })}
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


            <div className={s.blockButtons}>
                <h2>FINITION DES PROFILÉS DE JONCTION</h2>

                {PROFILES.map((item) => (

                    <Button
                        data-profile={item.id}
                        key={item.id}
                        active={profile === item.id}
                        className={`${s.vipanelButton} ${s.profileButton} ${profile === item.id ? s.finitionButtonActive : ''
                            }`}
                        onClick={() => setProfile(item.id)}
                    >
                        <img className={s.finitionImage} src={item.url} alt={item.label} />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </div>



            <div className={`${s.blockButtons} ${s.blockButtonsVipanel}`}>
                <h2>Décor mural VIPANEL®</h2>

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

                {activeVipanelZone === 'triptych' ? (
                    <div className={s.triptychWrapper}>
                        <div className={s.triptychColumn}>
                            <h3>Mur gauche</h3>
                            <div className={s.triptychGrid}>
                                {TRYPTICH_TEXTURES.map((item) => (
                                    <Button
                                        data-triptych={item.id}
                                        className={`${s.vipanelButton} ${triptychLeft === item.id ? s.vipanelButtonActive : ''
                                            }`}
                                        key={item.id}
                                        active={triptychLeft === item.id}
                                        onClick={() => setTriptychLeft(item.id)}
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
                        <div className={s.triptychColumn}>
                            <h3>Mur droit</h3>
                            <div className={s.triptychGrid}>
                                {TRYPTICH_TEXTURES.map((item) => (
                                    <Button
                                        data-triptych={item.id}
                                        className={`${s.vipanelButton} ${triptychRight === item.id ? s.vipanelButtonActive : ''
                                            }`}
                                        key={item.id}
                                        active={triptychRight === item.id}
                                        onClick={() => setTriptychRight(item.id)}
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

                    </div>
                ) : (
                    <div className={s.vipanelGrid}>
                        {VIPANEL_TEXTURES.map((item) => (
                            <Button
                                data-decor={item.id}
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
        </div>
    );
}
