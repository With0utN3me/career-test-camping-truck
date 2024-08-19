export const selectAdverts = (state) => state.adverts.allAdverts;

export const selectHasMore = (state) => state.adverts.hasMore;

export const selectSingleAdvert = (state) => state.adverts.singleAdvert

export const selectPage = (state) => state.adverts.page;

export const selectSavedAdverts = (state) => state.adverts.savedAdverts;

export const selectIsLoading = (state) => state.isLoading;

export const selectError = (state) => state.error;