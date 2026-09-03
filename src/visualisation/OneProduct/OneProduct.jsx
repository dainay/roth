import s from './OneProduct.module.scss'
import { getPhotoUrl, getProductUrl } from '../../helpers/getPhotoUrl'
import ProductLinkModal from '../ProductLinkModal'
import { FEATURES } from '../../conf/appMode';

const OneProduct = ({ product, type, imgClassName }) => {
    return (
        <div className={s.wrapper}>
            {FEATURES.modalWindow ? (
                <div
                    className={s.wrapperCancel}
                >
                    <div className={s.imgWrapper}>
                        <img src={getPhotoUrl(product.photo)} alt={product.libelle} className={imgClassName} />
                    </div>
                    <p className={s.textSmall}>{type} {type === 'Paroi de douche' ? product.type_paroi : ''}</p>
                    <h3 className={s.title}>{product.libelle}</h3>
                    <p className={s.textSmall}>à partir de {product.prix_min_ppht}€ PPHT</p>
                    {/* <div className={s.link}>Découvrir</div> */}
                    <ProductLinkModal
                     
                        url={getProductUrl(product.codearticle)}
                        title={product.libelle}
                        // url={`/catalogue/produit/${product.codearticle}`}
                    >
                        Découvrir 
                    </ProductLinkModal>
                </div>
            ) : (
                <a
                    href={getProductUrl(product.codearticle)}
                    target="_blank"
                    rel="noopener noreferrer" 
                >
                     

                    <div className={s.imgWrapper}>
                        <img src={getPhotoUrl(product.photo)} alt={product.libelle} className={imgClassName} />
                    </div>
                    <p className={s.textSmall}>{type} {type === 'Paroi de douche' ? product.type_paroi : ''}</p>
                    <h3 className={s.title}>{product.libelle}</h3>
                    <p className={s.textSmall}>à partir de {product.prix_min_ppht}€ PPHT</p>
                    <div className={s.link}
                     style={!getProductUrl(product.codearticle) ? { pointerEvents: 'none', opacity: 0 } : undefined}
                    >Découvrir</div>
                </a>

            )}
        </div>
    );
};

export default OneProduct;
