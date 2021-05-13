import { signIn, signOut, useSession } from "next-auth/client";

export default function Navbar() {
  const [session, loading] = useSession();

  function hideNavbar() {
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("hidden");
    const mobileMenuOpen = document.querySelector(".mobile-menu-open");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");
    mobileMenuClose.classList.toggle("hidden");
    mobileMenuOpen.classList.toggle("hidden");
  }

  return (
    <nav className="bg-gray-100">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <a
                href="#"
                className="flex items-center px-2 py-5 text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6 mr-2 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
                <span className="font-bold">KeepYourStreak</span>
              </a>
            </div>

            {/* secondary navbar */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="#"
                className="px-2 py-5 text-gray-700 hover:text-gray-900"
              >
                Todo
              </a>
              <a
                href="#"
                className="px-2 py-5 text-gray-700 hover:text-gray-900"
              >
                Calendar
              </a>
            </div>
          </div>

          {!loading && !session && (
            <>
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#"
                  onClick={() => signIn("google")}
                  className="px-2 py-5 text-gray-700 hover:text-gray-900"
                >
                  Log In
                </a>
                <a
                  href="#"
                  onClick={() => signIn("google")}
                  className="px-2 py-3 text-gray-700 hover:text-gray-900
                              text-yellow-900 hover:text-yellow:700
                              bg-yellow-400 hover:bg-yellow-300 rounded
                              transition duration-300"
                >
                  Sign up
                </a>
              </div>
            </>
          )}

          {!loading && session && (
            <>
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#"
                  onClick={() => signOut()}
                  className="px-2 py-5 text-gray-700 hover:text-gray-900"
                >
                  Log Out
                </a>
              </div>
            </>
          )}

          {/* mobile button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={hideNavbar}>
              <svg
                className="w-6 h-6 mobile-menu-open"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hidden mobile-menu-close"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div className="mobile-menu hidden md:hidden">
          <a href="#" className="block py-2 px-2">
            Todo
          </a>
          <a href="#" className="block py-2 px-2">
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}
