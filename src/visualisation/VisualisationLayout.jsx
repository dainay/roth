import React from 'react';
import s from './VisualisationLayout.module.css';
import OneProduct from './OneProduct/OneProduct';


const VisualisationLayout = ({ children }) => {
	return (
        <>
            <div className={s.visualisationLayout}>
                <div className={s.visualisationLayout__img}>
                    <img src="/img/pastel_0001.webp" alt="Visualisation" />
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
                       
                    <img className={s.qr} src="/img/qr.jpg" alt="QR Code" />

                    <a href="#" className={`link text-center ${s.link}`}>
                        Modifier ma configuration
                    </a>

                </div>
                
            </div>
        </>
    );
};

export default VisualisationLayout;
