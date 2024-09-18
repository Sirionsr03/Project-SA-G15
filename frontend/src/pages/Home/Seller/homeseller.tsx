// import { useState, useEffect } from 'react';
// import { PRODUCTS } from "../../../Product";


// import brandner1 from "../../../assets/brandner.png";
// import brandner2 from "../../../assets/Brandner2.png"; 
// import brandner3 from "../../../assets/Brandner3.png";

// import icons1 from "../../../icon/book.png";
// import icons2 from "../../../icon/pen.png";
// import icons3 from "../../../icon/shoe.png";
// import icons4 from "../../../icon/electronics.png";
// import icons5 from "../../../icon/shirt.png";
// import icons6 from "../../../icon/skirt.png";
// import icons7 from "../../../icon/pants.png";
// import "./homeseller.css"

// import NavbarSeller from '../../../component/navbarSeller';
// import { Course } from './prducts';


// const imageArray = [brandner1, brandner2, brandner3];

// const HomeSeller = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((Index) =>
//         Index === imageArray.length - 1 ? 0 : Index + 1
//       ); }, 1000); 

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <div className='home'>
//         <NavbarSeller />
//         <div className='box-page'>
//           <center>
//             <img src={imageArray[currentImageIndex]} alt="brandner" />
//           </center>
//         </div>
//         <div className="box-product">
//           <img src={icons1} alt="icon1" /><img src={icons2} alt="icon2" /><img src={icons3} alt="icon3" />
//           <img src={icons4} alt="icon4" /><img src={icons5} alt="icon5" /><img src={icons6} alt="icon6" /><img src={icons7} alt="icon7" />
//         </div>

//         <div className="Naw-arrivals">
//           <p>NEW ARRIVALS</p>
//         </div>

//         <div className="products">
//           {PRODUCTS.map((product) => (
//             <Course key={product.id} data={product} />
//           ))}
//         </div>
//       </div></>
//   );
// }

// export default HomeSeller;








import { useState, useEffect } from 'react';
import { PRODUCTS } from "../../../Product";


import brandner1 from "../../../assets/brandner.png";
import brandner2 from "../../../assets/Brandner2.png"; 
import brandner3 from "../../../assets/Brandner3.png";

import icons1 from "../../../icon/book.png";
import icons2 from "../../../icon/pen.png";
import icons3 from "../../../icon/shoe.png";
import icons4 from "../../../icon/electronics.png";
import icons5 from "../../../icon/shirt.png";
import icons6 from "../../../icon/skirt.png";
import icons7 from "../../../icon/pants.png";
import "./homeseller.css"

import NavbarSeller from '../../../component/navbarSeller';
import { Course } from './prนductsseller';


const imageArray = [brandner1, brandner2, brandner3];

const HomeSeller = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((Index) =>
        Index === imageArray.length - 1 ? 0 : Index + 1
      ); 
    }, 3000);


    return () => {
      clearInterval(imageInterval);

    };
  }, []);

  return (
    <>
      <div className='homeseller'>
        <NavbarSeller />
        <div className='box-pageseller'>
          <center>
            <img src={imageArray[currentImageIndex]} alt="brandner" />
          </center>
        </div>
        <div className="box-productseller">
          <img src={icons1} alt="icon1" /><img src={icons2} alt="icon2" /><img src={icons3} alt="icon3" />
          <img src={icons4} alt="icon4" /><img src={icons5} alt="icon5" /><img src={icons6} alt="icon6" /><img src={icons7} alt="icon7" />
        </div>

        <div className="Naw-arrivalsseller">
          <p>NEW ARRIVALS</p>
        </div>

        <div className="productsseller">
          {PRODUCTS.map((product) => (
            <Course key={product.id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeSeller;


