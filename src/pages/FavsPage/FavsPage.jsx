import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import SavedAdvertsList from '../../components/SavedAdvertsList/SavedAdvertsList';
import SavedFilters from '../../components/SavedFilters/SavedFilters';
import Notification from '../../components/Notification/Notification';
import AppBar from "../../components/AppBar/AppBar";
import { selectIsLoading, selectError, selectSavedAdverts } from '../../redux/adverts/selectors';
import { fetchSavedAdverts } from '../../redux/adverts/operations';
import { resetFilters } from '../../redux/filters/slice';
import css from "./FavsPage.module.css"

export default function FavsPage() {
    const dispatch = useDispatch();
    const adverts = useSelector(selectSavedAdverts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);


    useEffect(() => {
        dispatch(resetFilters());
        dispatch(fetchSavedAdverts());
    }, [dispatch]);


    return (
        <>
            <AppBar />
            <div className={css["page-wrapper"]}>
                <DocumentTitle>Favorites</DocumentTitle>
                <div className={css["filters"]}>
                    {!isLoading && adverts.length > 0 && <SavedFilters />}
                </div>
                <div className={css["adverts"]}>
                    {error && <Notification text={`Error: ${error}`} />}
                    {isLoading && !error && <Notification text={"Request in progress..."} />}
                    {!isLoading && adverts.length > 0 && <SavedAdvertsList />}
                    {!isLoading && adverts.length === 0 && <Notification text={"No saved adverts here..."} />}
                </div>
            </div>
        </>
    );
}