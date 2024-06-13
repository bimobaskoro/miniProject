"use client";
import { FaSearch } from "react-icons/fa";
import React, { useState, useCallback } from "react";
import { axiosInstance } from "../_lib/axios";
import { useFormik } from "formik";
import _ from "lodash";

interface SearchResult {
  title: string;
}

export default function SearchComponent() {
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axiosInstance().get(`/search/`, {
        params: { title: query },
      });

      setSearchResults(response.data.data);
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedSearch = useCallback(
    _.debounce((query: string) => handleSearch(query), 500),
    []
  );

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      handleSearch(values.search);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <div className="bg-white flex rounded-[5px] h-7 mt-4 border-gray-200 border-[1px] p-1 ml-3 mr-3 ">
        <FaSearch className=" text-gray-500  flex justify-center" />
        <input
          type="text"
          id="search"
          className="ml-5"
          value={formik.values.search}
          onChange={handleInputChange}
          placeholder="Search Event"
        ></input>
      </div>
      <div className="mt-4">
        {searchResults.map((result, index) => (
          <div key={index} className="border border-gray-200">
            <div>{result.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}
