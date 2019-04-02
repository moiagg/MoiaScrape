import Link from "next/link";
import Router from "../Router";
const router = Object.keys(Router);
const Navbar = ({ siteName }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <Link href="/">
      <a className="navbar-brand">{siteName}</a>
    </Link>
    <div className="" id="navbarNav">
      <div className="navbar-nav flex-row">
        {router.map((route, index) => (
          <span key={index}>
            <Link href={Router[route]}>
              <a className="nav-item nav-link mx-2">{route}</a>
            </Link>
          </span>
        ))}
      </div>
    </div>
  </nav>
);
export default Navbar;
