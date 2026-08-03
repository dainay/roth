import React from 'react';
import { useState } from 'react'
import s from './UI.module.scss'
import useConfiguratorStore from '../store/useConfiguratorStore';
import { SERIGRAPHIE, TRYPTICH_TEXTURES, NICHES, VIPANEL_TEXTURES, RECEVEUR_TEXTURES, SHOWER_TYPES, FINITIONS, PROFILES } from '../conf/textures'

import Button from './components/Button';

export default function UI() {
    const [activeVipanelZone, setActiveVipanelZone] = useState('left')

    const selection = useConfiguratorStore((state) => state.selection);
    const setSelectionValue = useConfiguratorStore((state) => state.setSelectionValue)


    const vipanelZones = [
        {
            id: 'left',
            label: 'Mur gauche',
            key: "vipanelLeft"
        },
        {
            id: 'niche',
            label: 'Espace douche',
            key: "vipanelNiche"
        },
        {
            id: 'right',
            label: 'Mur droit',
            key: "vipanelRight"
        },
        {
            id: 'triptych',
            label: 'Décor triptyque',
            key: null
        },
    ]

    const activeZone = vipanelZones.find((zone) => zone.id === activeVipanelZone)

    // console.log(activeZone.value)
    console.log(activeZone, selection.vipanelLeft, selection.vipanelRight, selection.vipanelNiche, selection.triptychLeft, selection.triptychRight)

    return (
        <div className={s.uiWrapper}>
            <div className={s.blockButtons}>
                <h2>Type de paroi</h2>

                {SHOWER_TYPES.map((item) => (
                    <Button
                        data-shower={item.id}
                        key={item.id}
                        active={selection.shower === item.id}
                        className={`${s.showerIcon} ${selection.shower === item.id ? s.showerIconActive : ''
                            }`}
                        onClick={() => setSelectionValue('shower', item.id)}
                    >
                        <img className={s.showerIcon} src={item.icon} alt={item.label} />
                        {item.label}
                    </Button>
                ))}
            </div>
            {selection.shower !== 'f' && (
                <div className={s.blockButtons}>
                    <h2>Type d’installation</h2>
                    <Button
                        className={s.buttonNormal}
                        active={selection.wall}
                        onClick={() => setSelectionValue('wall', true)}
                    >
                        En niche
                    </Button>
                    <Button
                        className={s.buttonNormal}
                        active={!selection.wall}
                        onClick={() => setSelectionValue('wall', false)}
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
                        active={selection.finition === item.id}
                        className={`${s.vipanelButton} ${selection.finition === item.id ? s.finitionButtonActive : ''
                            }`}
                        onClick={() => setSelectionValue('finition', item.id)}
                    >
                        <img className={s.finitionImage} src={item.url} alt={item.label} />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </div>
            {selection.shower !== 'p' && (
                <div className={s.blockButtons}>
                    <h2>Niche dans l'espace douche</h2>

                    {NICHES.map((item) => (

                        <Button

                            key={item.id}
                            data-niche={item.id}
                            active={selection.nicheColor === item.id}
                            className={`${s.vipanelButton} ${selection.nicheColor === item.id ? s.finitionButtonActive : ''
                                }`}
                            onClick={() => setSelectionValue('nicheColor', item.id)}
                        >
                            <img className={s.finitionImage} src={item.url} alt={item.label} />
                            <span>{item.label}</span>
                        </Button>
                    ))}
                </div>
            )}

            {selection.shower === 'f' && (
                <div className={s.blockButtons}>
                    <h2>Sérigraphie</h2>
                    {SERIGRAPHIE.map((item) => (

                        <Button
                            data-serigraphie={item.id}
                            key={item.id}
                            active={selection.serigraphie === item.id}
                            className={`${s.vipanelButton} ${selection.serigraphie === item.id ? s.finitionButtonActive : ''
                                }`}
                            onClick={() => setSelectionValue('serigraphie', item.id)}
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
                        className={`${s.vipanelButton} ${selection.receveur === item.id ? s.vipanelButtonActive : ''}`}
                        key={item.id}
                        active={selection.receveur === item.id}
                        onClick={() => setSelectionValue('receveur', item.id)}
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
                        active={selection.profile === item.id}
                        className={`${s.vipanelButton} ${s.profileButton} ${selection.profile === item.id ? s.finitionButtonActive : ''
                            }`}
                        onClick={() => setSelectionValue('profile', item.id)}
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
                                        className={`${s.vipanelButton} ${selection.triptychLeft === item.id ? s.vipanelButtonActive : ''
                                            }`}
                                        key={item.id}
                                        active={selection.triptychLeft === item.id}
                                        onClick={() => setSelectionValue('triptychLeft', item.id)}
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
                                        className={`${s.vipanelButton} ${selection.triptychRight === item.id ? s.vipanelButtonActive : ''
                                            }`}
                                        key={item.id}
                                        active={selection.triptychRight === item.id}
                                        onClick={() => setSelectionValue('triptychRight', item.id)}
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
                                className={`${s.vipanelButton} ${activeZone?.key && selection[activeZone.key] === item.id
                                        ? s.vipanelButtonActive
                                        : ''
                                    }`}
                                key={item.id}
                                active={activeZone?.key && selection[activeZone.key] === item.id}
                                onClick={() => {
                                    if (!activeZone?.key) return
                                    console.log('activeZone.key:', activeZone.key, 'item.id:', item.id)
                                    setSelectionValue(activeZone.key, item.id)
                                }}
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
