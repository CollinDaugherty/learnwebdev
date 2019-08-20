import React from 'react';

const SearchContext = React.createContext({
  list: [],
  searchTerms: '',
  updateSearchTerms: () => {},
  searchTutorials: () => {}
});

export const SearchProvider = SearchContext.Provider;
export const SearchConsumer = SearchContext.Consumer;

export default SearchContext;
