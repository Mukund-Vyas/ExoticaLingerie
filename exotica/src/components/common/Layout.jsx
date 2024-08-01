import Footer from '../Footer/Footer';
import NavBarLayout from '../NavBar/NavBarLayout';

const Layout = ({ children }) => {
  return (
    <div className='relative max-w-[1920px] mx-auto'>
      <NavBarLayout />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
