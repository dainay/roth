import s from './OneProduct.module.scss'
import { getPhotoUrl, getProductUrl } from '../../helpers/getPhotoUrl'
import ProductLink from '../ProductLink'
import { FEATURES } from '../../conf/appMode';

const OneProduct = ({ product, type, imgClassName }) => {
    return (
        <div className={s.wrapper}>
            {FEATURES.modalWindow ? (
                <div
                    // onClick={() => modalWindow(getProductUrl(product.codearticle))}
                    type="button"
                    className={s.btnClean}
                >
                    <div className={s.imgWrapper}>
                        <img src={getPhotoUrl(product.photo)} alt={product.libelle} className={imgClassName} />
                    </div>
                    <p className={s.textSmall}>{type} {type === 'Paroi de douche' ? product.type_paroi : ''}</p>
                    <h3 className={s.title}>{product.libelle}</h3>
                    <p className={s.textSmall}>à partir de {product.prix_min_ppht}€ PPHT</p>
                    <div className={s.link}>Découvrir</div>
                    <ProductLink
                        url={getProductUrl(product.codearticle)}
                        title={product.libelle}
                    >
                        Découvrir 
                    </ProductLink>
                </div>
            ) : (
                <a href={getProductUrl(product.codearticle)} target="_blank" rel="noopener noreferrer">

                    <div className={s.imgWrapper}>
                        <img src={getPhotoUrl(product.photo)} alt={product.libelle} className={imgClassName} />
                    </div>
                    <p className={s.textSmall}>{type} {type === 'Paroi de douche' ? product.type_paroi : ''}</p>
                    <h3 className={s.title}>{product.libelle}</h3>
                    <p className={s.textSmall}>à partir de {product.prix_min_ppht}€ PPHT</p>
                    <div className={s.link}>Découvrir</div>
                </a>

            )}
        </div>
    );
};

export default OneProduct;
