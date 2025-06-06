import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { articleId } = useParams();
  const [article, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCHES PRODUCT DETAILS w/ ROUTE ENDPOINT
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${articleId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-semibold mb-4 text-black">{article.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-72 object-cover rounded-md mb-4 md:mb-0"
          />
          <div>
            <p className="text-lg text-gray-700 mb-4">{article.description}</p>
            <p className="text-xl font-semibold text-green-500 mb-4">
              ${article.price}
            </p>
            <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
