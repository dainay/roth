import React, { useState, useEffect } from 'react'
import s from './UI.module.scss'
import useConfiguratorStore from '../store/useConfiguratorStore'
import { useShallow } from 'zustand/react/shallow'
import { FINITION_ASSETS, NICHE_FINITION_ASSETS, PROFILE_ASSETS, RECEVEUR_ASSETS, PAROI_ASSETS, SERIGRAPHIE_ASSETS, TRYPTICH_TEXTURES } from '../conf/lib'
import { getPhotoUrl } from '../helpers/getPhotoUrl'


import Button from './components/Button'

export default function UI() {
    const [activeVipanelZone, setActiveVipanelZone] = useState('left')

    const selection = useConfiguratorStore(
        useShallow((state) => ({
            paroi: state.selection.paroi,
            montage: state.selection.montage,
            finitionParoi: state.selection.finitionParoi,
            verre: state.selection.verre,
            sizeParoi: state.selection.sizeParoi,

            textureReceveur: state.selection.textureReceveur,
            receveur: state.selection.receveur,
            sizeReceveur: state.selection.sizeReceveur,

            finitionProfile: state.selection.finitionProfile,
            profile: state.selection.profile,

            finitionNiche: state.selection.finitionNiche,
            niche: state.selection.niche,

            triptychLeft: state.selection.triptychLeft,
            triptychRight: state.selection.triptychRight,

            vipanelLeft: state.selection.vipanelLeft,
            vipanelRight: state.selection.vipanelRight,
            vipanelNiche: state.selection.vipanelNiche,
        }))
    )
    const setSelectionValue = useConfiguratorStore((state) => state.setSelectionValue)

    const cleanedData = useConfiguratorStore((state) => state.cleanedData)
    const selectedParoiData = cleanedData?.parois?.find(
        (item) => item.id === selection.paroi
    )
    const angleAvailable = selectedParoiData?.['montage en angle'] === true
    const nicheAvailable = selectedParoiData?.['montage en niche'] === true
    const montageAvailable = angleAvailable && nicheAvailable

    useEffect(() => {
        if (angleAvailable && !nicheAvailable) {
            setSelectionValue('montage', 'angle')
        }

        if (!angleAvailable && nicheAvailable) {
            setSelectionValue('montage', 'niche')
        }
    }, [angleAvailable, nicheAvailable, setSelectionValue])

    const vipanelZones = [
        { id: 'left', label: 'Mur gauche', key: 'vipanelLeft' },
        { id: 'niche', label: 'Espace douche', key: 'vipanelNiche' },
        { id: 'right', label: 'Mur droit', key: 'vipanelRight' },
        // { id: 'triptych', label: 'Décor triptyque', key: null },
    ]

    const activeZone = vipanelZones.find((zone) => zone.id === activeVipanelZone)


    console.log('selection:', selection)

    const handleReceveurChange = (item) => {
        setSelectionValue('textureReceveur', item)
        setSelectionValue('receveur', cleanedData?.receveurs?.[0]?.id)
    }

    const handleNicheChange = (item) => {
        if (item === 'None') {
            setSelectionValue('niche', null)
            setSelectionValue('finitionNiche', null)
            return
        }
        setSelectionValue('finitionNiche', item)
        setSelectionValue('niche', cleanedData?.niches?.[0]?.id)

    }

    const handleProfileChange = (item) => {
        setSelectionValue('finitionProfile', item)
        setSelectionValue('profile', cleanedData?.profiles?.[0]?.id)
    }

     const handleParoiChange = (item) => {
        setSelectionValue('paroi', item.id)
        setSelectionValue('sizeParoi', PAROI_ASSETS[item.id].size)
        setSelectionValue('sizeReceveur', PAROI_ASSETS[item.id].sizeReceveurWithParoi) 
    }
 

    return (
        <div className={s.uiWrapper}>
            <div className={s.blockButtons}>
                <h2>Type de paroi</h2>

                {cleanedData?.parois.map((item) => (
                    <Button
                        data-paroi={item.id}
                        key={item.id}
                        active={selection.paroi === item.id}
                        className={`${s.showerIcon} ${selection.paroi === item.id ? s.showerIconActive : ''}`}
                        onClick={() => handleParoiChange(item)}
                    >
                        <img className={s.showerIcon} src={PAROI_ASSETS[item.id].icon} alt={item.label} />
                        {PAROI_ASSETS[item.id].shortLabel}
                    </Button>
                ))}
            </div>
            {montageAvailable && (
                <div className={s.blockButtons}>
                    <h2>Type d’installation</h2>


                    <>
                        <Button
                            className={s.buttonNormal}
                            active={selection.montage === 'angle'}
                            onClick={() => setSelectionValue('montage', 'angle')}
                        >
                            Avec paroi fixe
                        </Button>

                        <Button
                            className={s.buttonNormal}
                            active={selection.montage === 'niche'}
                            onClick={() => setSelectionValue('montage', 'niche')}
                        >
                            En niche
                        </Button>
                    </>

                </div>)
            }
            <div className={s.blockButtons}>
                <h2>Finition du profilé</h2>

                {selectedParoiData.finitionsDisponibles.map((item) => (
                    <Button
                        data-finition={item.code}
                        key={item.code}
                        active={selection.finitionParoi === item.code}
                        className={`${s.vipanelButton} ${selection.finitionParoi === item.code ? s.finitionButtonActive : ''}`}
                        onClick={() => setSelectionValue('finitionParoi', item.code)}
                    >
                        <img className={s.finitionImage} src={FINITION_ASSETS[item.code].img} alt={item.libelle} />
                        <span>{item.libelle}</span>
                    </Button>
                ))}
            </div>

            {selectedParoiData?.id !== "PL PIV" && (
                <div className={s.blockButtons}>
                    <h2>Niche dans l'espace douche</h2>
                    <Button
                        key={'None'}
                        data-niche={'None'}
                        active={selection.niche === 'None'}
                        className={`${s.vipanelButton} ${selection.niche === 'None' ? s.finitionButtonActive : ''}`}
                        onClick={() => handleNicheChange('None')}
                    >
                        <img className={s.finitionImage} src='./img/None.svg' alt={'Pas de niche'} />
                        <span>None</span>
                    </Button>

                    {cleanedData?.niches[0].finitionsDisponibles
                        .map((item) => (
                            <Button
                                key={item}
                                data-niche={item}
                                active={selection.niche === item}
                                className={`${s.vipanelButton} ${selection.niche === item ? s.finitionButtonActive : ''}`}
                                onClick={() => handleNicheChange(item)}
                            >
                                <img className={s.finitionImage} src={NICHE_FINITION_ASSETS[item].img} alt={item} />
                                <span>{NICHE_FINITION_ASSETS[item].label}</span>
                            </Button>
                        ))}
                </div>
            )}

            <div className={s.blockButtons}>
                <h2>Verre</h2>
                {selectedParoiData.verresDisponibles.map((item) => (
                    <Button
                        data-verre={item}
                        key={item}
                        active={selection.verre === item}
                        className={`${s.vipanelButton} ${selection.verre === item ? s.finitionButtonActive : ''}`}
                        onClick={() => setSelectionValue('verre', item)}
                    >
                        <img className={s.finitionImage} src={SERIGRAPHIE_ASSETS[item].img} alt={item} />
                        <span>{SERIGRAPHIE_ASSETS[item].label}</span>
                    </Button>
                ))
                }
            </div>

            <div className={s.blockButtons}>
                <h2>Finition du receveur</h2>

                {cleanedData?.receveurs[0].finitionsDisponibles.map((item) => (
                    <Button
                        data-receveur={item}
                        className={`${s.vipanelButton} ${selection.textureReceveur === item ? s.vipanelButtonActive : ''}`}
                        key={item}
                        active={selection.textureReceveur === item}
                        onClick={() => handleReceveurChange(item)}
                    >
                        <div className={s.imgVipanelWrapper}>
                            <img className={s.imgVipanel} src={RECEVEUR_ASSETS[item].img} alt={item} />
                        </div>
                        <span>{RECEVEUR_ASSETS[item].label}</span>
                    </Button>
                ))}
            </div>

            <div className={s.blockButtons}>
                <h2>FINITION DES PROFILÉS DE JONCTION</h2>

                {cleanedData?.profiles[0].finitionsDisponibles.map((item) => (
                    <Button
                        data-profile={item}
                        key={item}
                        active={selection.finitionProfile === item}
                        className={`${s.vipanelButton} ${s.profileButton} ${selection.finitionProfile === item ? s.finitionButtonActive : ''}`}
                        onClick={() => handleProfileChange(item)}
                    >
                        <img className={s.finitionImage} src={PROFILE_ASSETS[item].img} alt={item} />
                        <span>{PROFILE_ASSETS[item].label}</span>
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
                            className={`${s.vipanelTab} ${activeVipanelZone === zone.id ? s.vipanelTabActive : ''}`}
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
                                        className={`${s.vipanelButton} ${selection.triptychLeft === item.id ? s.vipanelButtonActive : ''}`}
                                        key={item.id}
                                        active={selection.triptychLeft === item.id}
                                        onClick={() => setSelectionValue('triptychLeft', item.id)}
                                    >
                                        <div className={s.imgVipanelWrapper}>
                                            <img className={s.imgVipanel} src={item.url} alt={item.label} />
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
                                        className={`${s.vipanelButton} ${selection.triptychRight === item.id ? s.vipanelButtonActive : ''}`}
                                        key={item.id}
                                        active={selection.triptychRight === item.id}
                                        onClick={() => setSelectionValue('triptychRight', item.id)}
                                    >
                                        <div className={s.imgVipanelWrapper}>
                                            <img className={s.imgVipanel} src={item.url} alt={item.label} />
                                        </div>
                                        <span>{item.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={s.vipanelGrid}>
                        {cleanedData.vipanels.map((item) => (
                            <Button
                                data-decor={item.decor}
                                className={`${s.vipanelButton} ${activeZone?.key && selection[activeZone.key] === item.decor ? s.vipanelButtonActive : ''}`}
                                key={item.id}
                                active={activeZone?.key && selection[activeZone.key] === item.decor}
                                onClick={() => {
                                    if (!activeZone?.key) return
                                    setSelectionValue(activeZone.key, item.decor)
                                }}
                            >
                                <div className={s.imgVipanelWrapper}>
                                    <img className={s.imgVipanel} src={getPhotoUrl(item.files["1500x2550"])} alt={item.decor} />
                                </div>
                                <span>{item.nom}</span>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
