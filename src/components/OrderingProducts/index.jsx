import "./index.css";
import { Dropdown } from "primereact/dropdown";
import { useContext, useState } from "react";
import QueryFiltersContext from "../../context/filtersContext";
import { orderingValues } from "../../constants";

function OrderingProducts() {
  const { setFilter, getActiveFilter } = useContext(QueryFiltersContext);
  const [ordering, setOrdering] = useState(
    orderingValues.find((value) => value.code === getActiveFilter("ordering"))
  );

  function handleSetOrdering(value) {
    setFilter({ name: "ordering", value: value.code });
    setOrdering(value);
  }
  return (
    <Dropdown
      value={ordering}
      onChange={(e) => handleSetOrdering(e.value)}
      options={orderingValues}
      optionLabel="name"
      placeholder="Ordenar"
      className="w-full md:w-14rem order-button"
    />
  );
}

export default OrderingProducts;
