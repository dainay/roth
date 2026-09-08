import s from './OneProduct.module.scss'
import { getPhotoUrl, getProductUrl } from '../../helpers/getPhotoUrl'
import ProductLinkModal from '../ProductLinkModal'
import { FEATURES } from '../../conf/appMode';

const OneProduct = ({ product, type, imgClassName }) => {
    const productUrl = getProductUrl(product.codearticle)
    const isAvailable = product.prix_min_ppht > 0

    const productContent = (
        <>
            <div className={s.imgWrapper}>
                <img
                    src={getPhotoUrl(product.photo)}
                    alt={product.libelle}
                    className={imgClassName}
                />
            </div>

            <p className={s.textSmall}>
                {type}
                {type === 'Paroi de douche'
                    ? ` ${product.type_paroi}`
                    : ''}
            </p>

            <h3 className={s.title}>
                {product.libelle}
            </h3>

            {isAvailable ? (
                <p className={s.textSmall}>
                    à partir de {product.prix_min_ppht}€ PPHT
                </p>
            ) : (
                <p className={s.disponible27}>
                    Disponible en 2027
                </p>
            )}
        </>
    )

    return (
        <div className={s.wrapper}>
            {FEATURES.modalWindow ? (
                <div className={s.wrapperCancel}>
                    {productContent}

                    {isAvailable && productUrl && (
                        <ProductLinkModal
                            url={productUrl}
                            title={product.libelle}
                        >
                            Découvrir
                        </ProductLinkModal>
                    )}
                </div>
            ) : (
                isAvailable && productUrl ? (
                    <a
                        href={productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {productContent}

                        <div className={s.link}>
                            Découvrir
                        </div>
                    </a>
                ) : (
                    <div className={s.wrapperCancel}>
                        {productContent}
                    </div>
                )
            )}
        </div>
    )
};

export default OneProduct;
