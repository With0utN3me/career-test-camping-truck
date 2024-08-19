import Advert from "../Advert/Advert"
import css from "./AdvertsList.module.css"
import { useSelector } from 'react-redux';
import { selectAdverts } from "../../redux/adverts/selectors";
import { nanoid } from "nanoid";


const AdvertsList = () => {
    const adverts = useSelector(selectAdverts);
    return(<ul className={css["adverts-list"]}>
        {adverts.map(advert => {
            return(
                <li className={css["list-item"]} key={nanoid()}>
                    <Advert advert = {advert} />
                </li>
            )
        })}
    </ul>)
}
export default AdvertsList;