import { NavLink } from 'react-router-dom';
import css from './AppBar.module.css';

const AppBar = () => {
    return (
        <header className={css.header}>
            <NavLink className={css.link} to="/">Home Page</NavLink>
            <NavLink className={css.link} to="/catalog">Catalog Page</NavLink>
            <NavLink className={css.link} to="/favorites">Favorites</NavLink>
        </header>
    );
};
export default AppBar;