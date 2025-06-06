import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "~/contexts/CartContext/CartContext";


const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // NUMBER OF PRODUCTS PER PAGE
  const { addToCart } = useCart(); // Destructure addToCart from useCart

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

    const handleAddToCart = (product: any) => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    addToCart(item); // Add the product to the cart
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // GET PRODUCTS FOR CURRENT PAGE
  const indexOfLastProduct = currentPage * productsPerPage; // FETCH INDEX OF LAST PRODUCT
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // FETCH INDEX OF FIRST PRODUCT
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // GET CURRENT PRODUCTS 

  // CALCULATE TOTAL PAGES
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Product List</h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-medium text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-sm my-2">{product.description}</p>
            <p className="text-lg font-semibold text-green-500 pb-2">${product.price}</p>
            <Link
              to={`/articles/${product.id}`}
              className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              View Details
            </Link>
            <button
            onClick={() => handleAddToCart(product)}
            className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >Add to Cart</button>
          </div>
        ))}
      </div>

      {/* PAGNATION CONTROLS */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;