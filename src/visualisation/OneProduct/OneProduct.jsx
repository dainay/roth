import s from './OneProduct.module.scss'

const OneProduct = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.imgWrapper}>
                <img src="./img/pastel_0001.webp" alt="" />
            </div>
            <p className={s.textSmall}>Paroi de douche coulissante</p>
            <h3 className={s.title}>Pastel argent poli</h3>
            <p className={s.textSmall}>à partir de 691€ PPHT</p>
            <a className={s.link} href="#">
                Découvrir
            </a>
        </div>
    );
};

export default OneProduct;