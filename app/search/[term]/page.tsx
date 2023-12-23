import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    term: string;
  };
};

function SearchPage({ params: { term } }: Props) {
  if (!term) notFound(); // 404 for no search item

  // Get rid of space %20
  const termToUser = decodeURI(term);

  // API call to get the Searched Movies
  // API to get the Popular Movies

  return <div>Welcome to the search page: {termToUser}</div>;
}

export default SearchPage;
