import { useState } from "react";
import { Link,useLocation } from "react-router-dom"

export default function Sidebar(){
  //sidebar component
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
    return(
      <>
      {/* menu for desktop screen */}
      <div className="hidden md:block w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link
            to="contacts"
            className={`block py-2 px-4 ${
              location.pathname === '/contacts' ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
           
          >
            Contacts
          </Link>
          <Link
            to="charts"
            className={`block py-2 px-4 ${
              location.pathname === '/charts' ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            
          >
            Charts
          </Link>
        </nav>
      </div>

{/* menu for phone screen */}
<div className="md:hidden">
<button
  onClick={toggleMobileMenu}
  className="fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 text-gray-800"
  aria-label="Toggle menu"
>
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
</button>
</div>
{isMobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-75">
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white p-5">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-gray-700"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <nav className="mt-12">
              <Link to="/contacts" className="block py-2 px-4 bg-gray-200">
                Contacts
              </Link>
              <Link to="/charts" className="block py-2 px-4 hover:bg-gray-100">
                Charts
              </Link>
            </nav>
          </div>
        </div>
      )}
</>
    )
}
