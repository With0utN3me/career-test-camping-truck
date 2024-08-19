import Advert from "../Advert/Advert"
import css from "./SavedAdvertsList.module.css"
import { useSelector } from 'react-redux';
import { selectSavedAdverts } from "../../redux/adverts/selectors";


const SavedAdvertsList = () => {
    const adverts = useSelector(selectSavedAdverts);
    return(<ul className={css["adverts-list"]}>
        {adverts.map(advert => {
            return(
                <li className={css["list-item"]} key={advert._id}>
                    <Advert advert = {advert} />
                </li>
            )
        })}
    </ul>)
}
export default SavedAdvertsList;