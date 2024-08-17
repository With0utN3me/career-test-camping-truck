import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import AdvertsList from '../../components/AdvertsList/AdvertsList';
import Filters from '../../Filters/Filters';
import Notification from '../../components/Notification/Notification';
import { selectIsLoading, selectError, selectAdverts, selectPage, selectTotalPages } from '../../redux/adverts/selectors';
import { fetchAdverts } from '../../redux/adverts/operations';
import { setPage } from '../../redux/adverts/slice';
import css from "./AdvertsPage.module.css"

export default function AdvertsPage() {
    const dispatch = useDispatch();
    const adverts = useSelector(selectAdverts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const page = useSelector(selectPage);
    const totalPages = useSelector(selectTotalPages);

    useEffect(() => {
        dispatch(fetchAdverts({ page, limit: 4 }));
    }, [dispatch, page]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    };

    return (
        <div className={css["page-wrapper"]}>
            <DocumentTitle>RentAcampVan</DocumentTitle>
            <div className={css["filters"]}>
                {!isLoading && adverts.length > 0 && <Filters />}
            </div>
            <div className={css["adverts"]}>
                {error && <Notification text={`Error: ${error}`} />}
                {isLoading && !error && <Notification text={"Request in progress..."} />}
                {!isLoading && adverts.length > 0 && <AdvertsList />}
                {!isLoading && adverts.length === 0 && <Notification text={"No adverts available..."} />}
                {page < totalPages && !isLoading && (
                    <button className={css["load-more"]} onClick={handleLoadMore}>Load More</button>
                )}
            </div>
        </div>
    );
}