import Footer from '../Footer/Footer';
import NavBarLayout from '../NavBar/NavBarLayout';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBarLayout />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
