import { useNavigate } from 'react-router-dom';
import "./navbar.css";
import Logo from "../assets/logo.png";
import list from "../assets/list.png";
import market from "../assets/shopping-cart.png";
import bell from "../assets/bell.png";

const NavbarSeller = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCreateProduct = () => {
    navigate('/createproducts'); // Navigate to ApplyToSeller page
  };

  return (
      <div className='navbar'>
              <img
                src={Logo}
                alt="Course Logo"
                style={{
                  width: "200px",
                  marginRight: "20px",
                  marginTop:"0"
                }}
              />
       <div className='right-section'>
         <div className='links'>
           <div className="search">
             <input type="text" placeholder="search"/>
           </div>
           <button className="button-createproduct" onClick={handleCreateProduct}>
             เพิ่มสินค้า
           </button>
           <div className="box-navbar">
             <img src={market} alt="market"/>
             <img src={list} alt="list"/>
             <img src={bell} alt="bell"/>
           </div>

         </div>

       </div>
      </div>

  );
}

export default NavbarSeller;
