import React from 'react';
import s from './VisualisationLayout.module.scss';
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
 
    const allProducts = Object.values(products).flat();
    
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

                    <h2 className="text-center">Recevoir mon récapitulatif PDF</h2>

                    <div className={s.wrapper_buttonsPDF}>
                        <div >
                            <h3>Par e-mail</h3>
                            <p>Saisir mon e-mail</p>
                            <div className={s.buttonPDF}>
                                <img src="./img/icons/mail.svg" alt="" />
                            </div>
                        </div>
                         <div >
                             <h3>Sur mon téléphone</h3>
                            <p>Scanner le QR code</p>
                            <div className={s.buttonPDF}>
                                <PdfQrCode className={s.qr} link={pdf} />
                            </div>

                         </div>
                    </div>

                    <p className="text">Vous voulez ajuster quelques détails ou recommencer votre projet ?</p>

                    <a href="#" className={`link text-center ${s.link}`} onClick={() => setCurrentView('configurateur')}>
                        Modifier ma configuration
                    </a>

                     <h2>Produits sélectionnés</h2>
                    <div className={s.visualisationLayout__products}>
                        {products.parois?.map((product, index) => (
                            <OneProduct key={index} product={product} type="Paroi de douche" />
                        ))}
                        {products.receveur?.map((product, index) => (
                            <OneProduct key={index} product={product} type="Receveur" />
                        ))}
                        {products.profile?.map((product, index) => (
                            <OneProduct key={index} product={product} type="Profilé de jonction" imgClassName={s.imgWithWhiteBackground} />
                        ))}
                        {products.niches?.map((product, index) => (
                            <OneProduct key={index} product={product} type="Niche" imgClassName={s.imgWithWhiteBackground} />
                        ))}
                        {products.vipanels?.map((product, index) => (
                            <OneProduct key={index} product={product} type="Panneau mural VIPANEL®" />
                        ))}
                    </div>

                </div>
                
            </div>
        </>
    );
};

export default VisualisationLayout;
