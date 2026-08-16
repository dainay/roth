import { useState } from 'react';

import s from './VisualisationLayout.module.scss';
import OneProduct from './OneProduct/OneProduct';
import PdfQrCode from './PdfQrCode';
import EmailPdfModal from './EmailPdfModal';

import useConfiguratorStore from '../store/useConfiguratorStore';


const VisualisationLayout = () => {

    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const realImg = useConfiguratorStore((state) => state.realImg);
    const products = useConfiguratorStore((state) => state.products);
    const pdf = useConfiguratorStore((state) => state.pdf);

    const setCurrentView = useConfiguratorStore((state) => state.setCurrentView);
 
    if (!realImg || !products || !pdf) {
        return (
            <div className={s.visualisationLayout__error}>
                Impossible d’afficher la visualisation.
            </div>
        )
    }

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
                         <div>
                             <h3>Sur mon téléphone</h3>
                            <p>Scanner le QR code</p>
                            <div className={s.buttonPDF}>
                                <PdfQrCode className={s.qr} link={pdf} />
                            </div>

                         </div>
                         <div>
                            <h3>Par e-mail</h3>
                            <p>Recevoir le PDF</p>
                            <button
                                type="button"
                                className={`${s.buttonPDF} ${s.emailButton}`}
                                onClick={() => setIsEmailModalOpen(true)}
                                aria-haspopup="dialog"
                            >
                                <img src="./img/icons/mail.svg" alt="" aria-hidden="true" />
                                {/* <span>Envoyer par e-mail</span> */}
                            </button>
                         </div>
                    </div>

                    <p className="text">Vous voulez ajuster quelques détails ou recommencer votre projet ?</p>

                    <button type="button" className={`link text-center ${s.link}`} onClick={() => setCurrentView('configurateur')}>
                        Modifier ma configuration
                    </button>

                     <h2>Produits sélectionnés</h2>
                    <div className={s.visualisationLayout__products}>
                        {products.parois?.map((product) => (
                            <OneProduct key={`paroi-${product.codearticle}`} product={product} type="Paroi de douche" />
                        ))}
                        {products.receveur?.map((product) => (
                            <OneProduct key={`receveur-${product.codearticle}`} product={product} type="Receveur" />
                        ))}
                        {products.profile?.map((product) => (
                            <OneProduct key={`profile-${product.codearticle}`} product={product} type="Profilé de jonction" imgClassName={s.imgWithWhiteBackground} />
                        ))}
                        {products.niches?.map((product) => (
                            <OneProduct key={`niche-${product.codearticle}`} product={product} type="Niche" imgClassName={s.imgWithWhiteBackground} />
                        ))}
                        {products.vipanels?.map((product) => (
                            <OneProduct key={`vipanel-${product.codearticle}`} product={product} type="Panneau mural VIPANEL®" />
                        ))}
                    </div>

                </div>
                
            </div>
            {isEmailModalOpen && (
                <EmailPdfModal pdf={pdf} onClose={() => setIsEmailModalOpen(false)} />
            )}
        </>
    );
};

export default VisualisationLayout;
