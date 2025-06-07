import { Link } from "react-router-dom";

// FUNCTION TO CHECK IF USER IS AUTHENTICATED
export const isUserAuthenticated = (): boolean => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    return !!sessionStorage.getItem("jwt");
  }
  return false;
};

// FUNCTION TO CHECK IF ADMIN IS AUTHENTICATED
export const isAdminAuthenticated = (): boolean => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    return !!sessionStorage.getItem("admin");
  }
  return false;
};;

export const Header = () => {
  const userAuthenticated = isUserAuthenticated();
  const adminAuthenticated = isAdminAuthenticated();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/articles" className="hover:underline">Articles</Link>
            </li>
            {/* SHOW CART LINK FOR AUTHENTICATED USERS */}
            {userAuthenticated && (
              <li>
                <Link to="/cart" className="hover:underline">Cart</Link>
              </li>
            )}
            
            {/* IF USER IS NOT AUTHENTICATED, SHOW LOGIN LINK */}
            {!userAuthenticated && !adminAuthenticated && (
              <>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li>
                  <Link to="/admin-login" className="hover:underline">Admin Login</Link>
                </li>
              </>
            )}
            
            {/* SHOW ADMIN DASHBOARD IF ADMIN IS AUTHENTICATED */}
            {adminAuthenticated && (
              <li>
                <Link to="/admin-dashboard" className="hover:underline">Admin Panel</Link>
              </li>
            )}

            {/* SHOW LOGOUT LINK IF USER IS AUTHENTICATED */}
            {userAuthenticated && !adminAuthenticated && (
              <li>
                <Link to="/login" className="hover:underline" onClick={() => {
                  sessionStorage.removeItem("jwt"); // CLEAR USER SESSION
                  window.location.href = "/login"; // REDIRECT TO LOGIN PAGE
                }}>
                  Logout
                </Link>
              </li>
            )}

            {/* SHOW LOGOUT LINK IF ADMIN IS AUTHENTICATED */}
            {adminAuthenticated && (
              <li>
                <Link to="/admin-login" className="hover:underline" onClick={() => {
                  sessionStorage.removeItem("admin"); // CLEAR ADMIN SESSION
                  window.location.href = "/admin-login"; // REDIRECT TO ADMIN LOGIN PAGE
                }}>
                  Admin Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
