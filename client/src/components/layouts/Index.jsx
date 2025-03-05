import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrand } from "../../redux/features/brandSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

  // Log whenever brands or loading changes
  useEffect(() => {
    console.log("Brands:", brands);
    console.log("Loading:", loading);
  }, [brands, loading]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Brand List</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : brands.length === 0 ? (
        <p className="text-center">No brands found</p>
      ) : (
        <ul className="list-group">
          {brands.map((brand) => (
            <li key={brand.id} className="list-group-item">
              {brand.name} (ID: {brand.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
