import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCHES PRODUCTS FROM FAKE STORE API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // RENDER WILL RETURN PRODUCTS
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((articles) => (
          <div
            key={articles.id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={articles.image}
              alt={articles.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-medium text-gray-800">{articles.title}</h2>
            <p className="text-gray-600 text-sm my-2">{articles.description}</p>
            <p className="text-lg font-semibold text-green-500">${articles.price}</p>
            <Link to={`/articles/${articles.id}`}>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
