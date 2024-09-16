import React, { useState, useRef, useEffect } from 'react';
import '../../../pages/authentication/Member/Profile.css';
import { FaEdit } from 'react-icons/fa';
import { ArrowBendUpLeft } from 'phosphor-react';
import logo from '../../../assets/LogoOrange.png';
import { Button, Form, Input, message, Col, Flex, Card, Row, Table} from "antd";
import { Link, Routes, useNavigate, Route } from "react-router-dom";
import { MemberInterface } from '../../../interfaces/Member';
import type { ColumnsType } from "antd/es/table";


function Profile() {

  const navigate = useNavigate();

  interface DataType {

    key: string;
  
    name: string;
  
    email: string;
  
    phonenumber: string[];
  
  }

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // กำหนดประเภทของ e ให้เป็น React.ChangeEvent<HTMLInputElement>
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];  // ใช้ Optional Chaining
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string); // แปลง reader.result เป็น string
      };
      reader.readAsDataURL(file);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  const [users, setUsers] = useState<MemberInterface[]>([]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const columns: ColumnsType<DataType> = [
    { 
      title: "ชื่อผู้ใช้",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title:"Email",
      dataIndex:"Email",
      key:"Email",
    },
    {
      title:"เบอร์โทรศัพท์",
      dataIndex:"PhoneNumber",
      key:"PhoneNumber",
    }
  ];

  const data: DataType[] = [];

  const GetMember = async () => {

    let res = await GetMember();

   

    if (res.status == 200) {

      setUsers(res.data);

    } else {

      setUsers([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };


  useEffect(() => {
    GetMember(); // ดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
  }, []);

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };


  return (<>
    {contextHolder}

    <Flex justify="center" align="center" className="login">

      <Card className="card-profile" style={{ width: 600,}}>

        <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <img alt="logo" style={{ width: "15%" }} src={logo} className="images-logo"/>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="back-arrow" onClick={() => navigate("/HomeLogin")}>
              <ArrowBendUpLeft size={32} />
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
           <div className="profile-content">
              <div className="profile-image-container">
                <div className="profile-image">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="uploaded-image" />
                  ) : (
                    <svg
                      height="100%"
                      viewBox="0 0 512 512"
                      width="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m256 0c-141.160156 0-256 114.839844-256 256s114.839844 256 256 256 256-114.839844 256-256c-.164062-141.097656-114.902344-255.835938-256-256zm0 482c-124.617188 0-226-101.382812-226-226s101.382812-226 226-226 226 101.382812 226 226c-.140625 124.558594-101.441406 225.859375-226 226zm0 0"
                        fill="#d3d3d3"
                      />
                      <path
                        d="m256 60c-108.074219 0-196 87.925781-196 196s87.925781 196 196 196 196-87.925781 196-196c-.121094-108.027344-87.972656-195.878906-196-196zm0 30c53.019531-.003906 100.503906 29.816406 124.484375 77.09375 6.640625 12.191406 17.585937 30.300781 15.515625 49.90625-3.695312 39.816406-36.058594 55.09375-56 61.195312v-15.195312c-.09375-35.667968-27.980469-65.417969-63.699219-69.386719-2.132812-.242187-4.28125-.242187-6.414062 0-35.714844 3.96875-63.605469 33.71875-63.699219 69.386719v15.195312c-19.941406-6.101562-52.300781-21.378906-56-61.195312-2.074218-19.605469 8.878906-37.742188 15.484375-49.917969 23.984375-47.273437 71.457031-77.09375 124.484375-77.09375zm0 0"
                        fill="#a9a9a9"
                      />
                    </svg>
                  )}
                </div>

                <button className="edit-button" onClick={handleEditClick}>
                  <FaEdit /> Edit
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
            </div>
          </Col>

          <Form name="basic" layout="vertical">

          <div className="groupinfo">

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label className="username">ชื่อผู้ใช้</label>
                <Table columns={columns} dataSource={data} />
              </Form.Item>
            </Col> 

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label className="email">Email</label>
              </Form.Item>
            </Col>
                
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label className="phonenumber">เบอร์โทรศัพท์</label>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Link to ="/Profile/ProfileEdit/:id">
                  <Button type="primary" htmlType="submit" className="edit-imf-button" style={{ marginBottom: 20 }} onClick={() => navigate(`/Profile/ProfileEdit/${record.ID}`)}>
                    แก้ไขข้อมูลส่วนตัว
                  </Button>
                </Link>
                <div>
                  <Button type="primary" htmlType="submit" className="logoutprofile-button" style={{ marginBottom: 20 }} onClick={Logout}>
                    Log out
                  </Button>
                </div>
            </Col>

          </div>

          </Form>

        </Row>

      </Card>

    </Flex>

    {/* <Routes>
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Profile/ProfileEdit/:id" element={<ProfileEdit />} />
    </Routes> */}

  

      
      

  </>);
}

export default Profile;
