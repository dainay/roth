import s from './OneProduct.module.scss'

const OneProduct = ({ product, type, imgClassName }) => {
    return (
        <div className={s.wrapper}>
             <a  href={`https://testwww.roth-france.fr/catalogue/produit/${product.codearticle}`} target="_blank" rel="noopener noreferrer">
            <div className={s.imgWrapper}>
                <img src={`https://testwww.roth-france.fr/photos/${product.photo}`} alt={product.libelle} className={imgClassName} />
            </div>
            <p className={s.textSmall}>{type} {type === 'Paroi de douche' ? product.type_paroi : ''}</p>
            <h3 className={s.title}>{product.libelle}</h3>
            <p className={s.textSmall}>à partir de {product.prix_min_ppht}€ PPHT</p> 
                <div className={s.link}>Découvrir</div>
            </a>
        </div>
    );
};

export default OneProduct;