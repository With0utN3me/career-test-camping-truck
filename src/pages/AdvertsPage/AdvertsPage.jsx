import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import AdvertsList from '../../components/AdvertsList/AdvertsList';
import Filters from '../../components/Filters/Filters';
import Notification from '../../components/Notification/Notification';
import AppBar from "../../components/AppBar/AppBar";
import { selectIsLoading, selectError, selectAdverts, selectPage, selectHasMore } from '../../redux/adverts/selectors';
import { fetchAdverts } from '../../redux/adverts/operations';
import { setPage } from '../../redux/adverts/slice';
import { resetFilters } from '../../redux/filters/slice';
import css from "./AdvertsPage.module.css"

export default function AdvertsPage() {
    const dispatch = useDispatch();
    const adverts = useSelector(selectAdverts);
    const hasMore = useSelector(selectHasMore);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const page = useSelector(selectPage);

    useEffect(() => {
        dispatch(resetFilters());
        dispatch(fetchAdverts({ page, limit: 4 }));
    }, [dispatch, page]);

    const handleLoadMore = () => {
        if (hasMore) {
            dispatch(setPage(page + 1));
        }
    };

    return (
        <>
            <AppBar />
            <div className={css["page-wrapper"]}>
                <DocumentTitle>RentAcamper</DocumentTitle>
                <div className={css["filters"]}>
                    {!isLoading && adverts.length > 0 && <Filters />}
                </div>
                <div className={css["adverts"]}>
                    {error && <Notification text={`Error: ${error}`} />}
                    {isLoading && !error && <Notification text={"Request in progress..."} />}
                    {!isLoading && adverts.length > 0 && <AdvertsList />}
                    {!isLoading && adverts.length === 0 && <Notification text={"No adverts available..."} />}
                    {hasMore && !isLoading && (
                        <button className={css["load-more"]} onClick={handleLoadMore}>Load More</button>
                    )}
                </div>
            </div>
        </>
    );
}