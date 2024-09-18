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
import "./homemember.css"

import NavbarMember from '../../../component/navbarMember';
import { Course } from './product';
import { MemberInterface } from '../../../interfaces/Member';
import { GetMemberById } from '../../../services/http';

const imageArray = [brandner1, brandner2, brandner3];

const HomeMember = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //ส่วนที่เพิ่มมาใหม่ ****start
  const [mid , setMid] = useState<number | null>(Number(localStorage.getItem("id")))
  const [member, setMember] = useState<MemberInterface | null>(null);

  const GetMemberId = async (member_id:number) => {

    let res = await GetMemberById(member_id);
    
    if (res.status == 200) {

      setMember(res.data);

    } else {


      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };
  useEffect(() => {
    setMid(Number(localStorage.getItem("id")))
    console.log(mid);
    GetMemberId(mid); // ดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
  }, []);
  //ส่วนที่เพิ่มมาใหม่******* end

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((Index) =>
        Index === imageArray.length - 1 ? 0 : Index + 1
      ); }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='homemember'>
        <NavbarMember />
        <div className='box-pagemember'>
          <center>
            <img src={imageArray[currentImageIndex]} alt="brandner" />
          </center>
        </div>
        <div className="box-productmember">
          <img src={icons1} alt="icon1" /><img src={icons2} alt="icon2" /><img src={icons3} alt="icon3" />
          <img src={icons4} alt="icon4" /><img src={icons5} alt="icon5" /><img src={icons6} alt="icon6" /><img src={icons7} alt="icon7" />
        </div>

        <div className="Naw-arrivalsmember">
          <p>NEW ARRIVALS</p>
        </div>

        <div className="products">
          {PRODUCTS.map((product) => (
            <Course key={product.id} data={product} />
          ))}
        </div>
      </div></>
  );
}

export default HomeMember;




