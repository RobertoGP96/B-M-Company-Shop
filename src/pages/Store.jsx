import CategorieSideBar from "../components/CategorieSideBar";
import ProductsGrid from "../components/ProductsGrid";
import Search from "../components/Search";
import OrderingProducts from "../components/OrderingProducts";
import "./pagesStyles/Store.css";
import ProductDetails from "../components/ProductDetails";
import { useState, useEffect } from "react";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";
import PromotionsModal from "../components/PromotionsModal";

function Store() {
  const [activeProductDetails, setActiveProductDetails] = useState(false);
  const [data, setdata] = useState([]);
  const { categories, loading } = useGetCategories();
  const { promotions, loadingPromotions } = useGetPromotions();
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = activeProductDetails ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [activeProductDetails]);

  const handleOnactivateProductdetails = (products) => {
    setdata(products);
    setActiveProductDetails(true);
  };
  return (
    <section className={"store-page"}>
      <aside>
        <CategorieSideBar
          loading={loading}
          categories={categories}
          showPromotionsModal = {setShowPromotionsModal}
        />
      </aside>
      <PromotionsModal
        show={showPromotionsModal}
        setShow={setShowPromotionsModal}
        promotions={promotions}
        loadingPromotions={loadingPromotions}
      />
      <search>
        <section className="search-product">
          <h3>Productos</h3>
          <section className="search-order-container">
            <Search />
            <OrderingProducts />
          </section>
        </section>
      </search>
      <main>
        <ProductsGrid activateProductdetails={handleOnactivateProductdetails} />
      </main>
      <ProductDetails
        active={activeProductDetails}
        onHide={() => setActiveProductDetails(false)}
        data={data}
      />
    </section>
  );
}

export default Store;
