import NavbarMyProducts from '../../../component/navbarproducts';
import "./MyProducts.css";
import { Card, Col, Row } from 'antd';
import market from "../../../assets/market.png";




interface Products {
  ID: number;
  Title: string;
  Price: number;
  Picture_product: string;
  Description: string;
  SellerID: number;
}

const Products = () => {

  const { Meta } = Card;
  return (
    <>
      <div className='homemyproduct'>
        <NavbarMyProducts />
          <div className='headmyproducts'>
            <img src={market} alt="market" style={{width:"30px", height:"30px"}}/>
            <h2>MyProduct</h2>
          </div>
        <Row gutter={[16, 16]}>
          <Col span={5} >
            <Card
              hoverable
              style={{ 
                width: 150,
                height: 100,
                marginTop: 15,
                marginLeft:80
              }}

              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          </Col>
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
        </Row>


      </div>

    </>
  );
}

export default Products;