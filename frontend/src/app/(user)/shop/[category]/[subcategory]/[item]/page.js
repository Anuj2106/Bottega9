import axios from "axios";
import ProductList from "@/app/(user)/Components/ProductList";

import PreloaderWrapper from "@/app/(user)/Components/Preloaderwrapper";

const API = process.env.NEXT_PUBLIC_BACKEND_LINK;

// ✅ Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { category, subcategory, item } = await params;

  try {
    const res = await axios.get(`${API}/api/shop/${category}/${subcategory}/${item}`);
    const products = res.data;

    return {
      title: `${item.replace(/-/g, " ")} | BOTTEGA9`,
      description: `Discover our ${item.replace(
        /-/g,
        " "
      )} collection in ${subcategory.replace(/-/g, " ")} under ${category.replace(
        /-/g,
        " "
      )}. ${products.length} premium products available.`,
    };
  } catch (err) {
    return {
      title: `${item.replace(/-/g, " ")} | BOTTEGA9`,
      description: `Explore ${item.replace(/-/g, " ")} under ${subcategory.replace(
        /-/g,
        " "
      )} at BOTTEGA9.`,
    };
  }
}

// ✅ Item Page Component
const ItemPage = async ({ params }) => {
  const { category, subcategory, item } = params;

  let products = [];
  let categories = [];

  try {
    // ✅ Fetch item-specific products
    const resProducts = await axios.get(
      `${API}/api/shop/${category}/${subcategory}/${item}`
    );
    products = resProducts.data;

    // ✅ Fetch all categories (for sidebar/filter)
    const resCategories = await axios.get(`${API}/api/categories`);
    categories = resCategories.data;
  } catch (err) {
    console.error("Error fetching item data:", err);
  }

  return (
    <PreloaderWrapper>


      {/* Product list with filters/sorting */}
      <ProductList
        initialProducts={products}
        categories={categories}
        category={category}
        subcategory={subcategory}
        item={item}
      />
    </PreloaderWrapper>
  );
};

export default ItemPage;
