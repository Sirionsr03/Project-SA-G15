import React, { useState, useEffect } from 'react';
import '../../../pages/authentication/Member/Profile.css';
import { ArrowBendUpLeft } from 'phosphor-react';
import logo from '../../../assets/LogoOrange.png';
import { Button, Form,  message, Col, Flex, Card, Row} from "antd";
import { Link, useNavigate} from "react-router-dom";
import { MemberInterface } from '../../../interfaces/Member';
import { GetMemberById } from '../../../services/http';


function Profile() {

  const navigate = useNavigate();

  const [uid , setUid] = useState<number | null>(Number(localStorage.getItem("id")))
  
  const [messageApi, contextHolder] = message.useMessage();

  const [users, setUsers] = useState<MemberInterface | null>(null);
  
  const GetMemberid = async (user_id:number) => {

    let res = await GetMemberById(user_id);
    
    if (res.status == 200) {

      setUsers(res.data);

    } else {


      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };

  useEffect(() => {
    setUid(Number(localStorage.getItem("id")))
    console.log(uid);
    GetMemberid(uid); // ดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
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

          <Form name="basic" layout="vertical">

          <div className="profilepic">
            <img src={users?.ProfilePic} alt="No"/>
          </div>

          <div className="groupinfo">

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label className="username">Username : {users?.Username}</label>
              </Form.Item>
            </Col> 

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label className="email">Email : {users?.Email}</label>
              </Form.Item>
            </Col>
                
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label className="phonenumber">Phone Number : {users?.PhoneNumber}</label>
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
