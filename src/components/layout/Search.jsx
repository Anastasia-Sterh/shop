import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "./useDebounce";
import {
  changeSearch,
  getSearchSelector,
} from "../../toolkit/slices/searchSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Search() {
  const [searchParams] = useSearchParams();
  const firstSearch = searchParams.get("search");
  const [searchInput, setSearchInput] = useState(
    firstSearch ? firstSearch : ""
  );
  const dispatch = useDispatch();
  const debounceValue = useDebounce(searchInput, 1000);
  const navigate = useNavigate();
  const debounceSearch = useSelector(getSearchSelector);

  useEffect(() => {
    dispatch(changeSearch(debounceValue));
  }, [debounceValue]);

  useEffect(() => {
    if (debounceSearch == "") {
      setSearchInput("");
    }
  }, [debounceSearch]);

  const onChange = (ev) => {
    const value = ev.target.value;
    setSearchInput(value);

    if (value) {
      navigate({
        pathname: "/main",
        search: `?search=${value}`,
      });
    } else {
      navigate("/main");
    }
  };

  return (
    <div className="header__center search">
      <div className="search__container">
        <input
          name="search"
          label="Что вы ищете?"
          type="text"
          className="search__container-input"
          value={searchInput}
          onChange={onChange}
        />
        <div className="search__container-button" type="submit">
          {" "}
          <SearchIcon />{" "}
        </div>
      </div>
    </div>
  );
}
