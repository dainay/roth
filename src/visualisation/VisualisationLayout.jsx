import React from 'react';
import s from './VisualisationLayout.module.css';
import OneProduct from './OneProduct/OneProduct';
import PdfQrCode from './PdfQrCode';

import useConfiguratorStore from '../store/useConfiguratorStore';
import { useShallow } from 'zustand/shallow';
import { useLayoutEffect } from 'react';


const VisualisationLayout = ({ children }) => {

    const realImg = useConfiguratorStore((state) => state.realImg);
    const products = useConfiguratorStore((state) => state.products);
    const pdf = useConfiguratorStore((state) => state.pdf);

    const setCurrentView = useConfiguratorStore((state) => state.setCurrentView);
 
    console.log('realImg', realImg, 'products', products, 'pdf', pdf);

	return (
        <>
            <div className={s.visualisationLayout}>
                <div className={s.visualisationLayout__img}>
                    <img src={realImg} alt="Visualisation" />
                </div>

                <div className={s.visualisationLayout__content}>
                    <h1>Votre projet en image</h1>
                    <p className="text">Découvrez vos produits Roth dans une ambiance réaliste pour mieux vous projeter.</p>

                    {/* <h2>Produits sélectionnés</h2> */}
                    <div className={s.visualisationLayout__products}>
                        <OneProduct />
                        <OneProduct />
                        <OneProduct />
                        <OneProduct />
                        <OneProduct /> 
                        <OneProduct />  
                    </div>

                    <button className={`btn ${s.button}`}>
                        Envoyer le récapitulatif PDF par mail 
                    </button>
                     <p className={`text text-center ${s.text}`}>ou</p>
                    <p className="text text-center">Télécharger le récapitulatif PDF par QR code</p>
                       
                    <PdfQrCode className={s.qr} link={pdf} />

                    <a href="#" className={`link text-center ${s.link}`} onClick={() => setCurrentView('configurateur')}>
                        Modifier ma configuration
                    </a>

                </div>
                
            </div>
        </>
    );
};

export default VisualisationLayout;
