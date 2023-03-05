import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../components/main/ProductCard";
import { CircularProgress, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { search } from "../api";
import { getSearchSelector } from "../toolkit/slices/searchSlice";
import SortMenu from "../components/main/SortMenu";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Main() {
  const [searchParams] = useSearchParams();
  const firstSort = searchParams.get("sort");
  const [sortBy, setSortBy] = useState(firstSort ? firstSort : "");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsForPage] = useState(20);
  const debounceSearch = useSelector(getSearchSelector);
  const navigate = useNavigate();

  const {
    data: resultSearch,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
  } = useQuery({
    queryKey: ["search", debounceSearch, sortBy],
    queryFn: async () => {
      return await search(debounceSearch, sortBy);
    },
  });
  console.log(resultSearch, "res");

  useEffect(() => {
    if (sortBy != "" && firstSort == null) {
      setSortBy("");
    }
  }, [sortBy, firstSort]);

  const onChange = (value) => {
    if (value) {
    setSortBy(value);
      navigate({
        pathname: "/main",
        search: `?sort=${value}`,
      });
    } else {
      setSortBy("");
      navigate("/main");
    }
  };

  if (isLoadingSearch) {
    return <CircularProgress color="secondary" className="loader" />;
  }

  if (isErrorSearch) {
    return <p className="error">{errorSearch.message}</p>;
  }
  if (resultSearch.length == 0) {
    return (
      <p className="error">Простите, по вашему запросу ничего не найдено.</p>
    );
  }

  const lastProductIndex = currentPage * productsForPage;
  const firstProductIndex = lastProductIndex - productsForPage;
  let resultWithPag = resultSearch.slice(firstProductIndex, lastProductIndex);

  const countPage = (allProducts, productsForPage) => {
    let numberPage = [];
    for (let i = 1; i <= Math.ceil(allProducts / productsForPage); i++) {
      numberPage.push(i);
    }
    return numberPage.length;
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="main">
      <div className="main__sort">
        <SortMenu setSortBy={setSortBy} onChange={onChange} sortBy={sortBy} />
      </div>
      <div className="main__products">
        {resultWithPag.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="main__pagination">
        <Pagination
          count={countPage(resultSearch.length, productsForPage)}
          color="secondary"
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
