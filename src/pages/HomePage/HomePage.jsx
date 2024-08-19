import DocumentTitle from '../../components/DocumentTitle';
import css from "./HomePage.module.css";
import { NavLink } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
            <DocumentTitle>CAMPERS</DocumentTitle>
            <div className={css.container}>
                <div className={css.titleWrapper}>
                    <h1 className={css.title}>
                        CAMPERS
                    </h1>
                    <p className={css.p}>You can rent <span className={css.span}>BEST vans and trucks for camping </span><NavLink to="/catalog" className={css.link}>here</NavLink></p>
                </div>
                <div className={css.bigImageWrap}>
                    <NavLink className={css.bigLink} to="/catalog">
                        <h2 className={css.h2}>Discover Adventure: Your Dream Camper Awaits!</h2>
                    </NavLink>
                </div>
            </div>
        </>
    );
}