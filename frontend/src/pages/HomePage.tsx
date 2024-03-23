import { Link } from "react-router-dom";
import { sampleProducts } from "../data";
import { Col, Row } from "react-bootstrap";
import { Product } from "../types/Product";

type State = {
  products: Product[],
  loading: boolean,
  error: string
}

type Action = 
|{
  type: 'FETCH_REQUEST'
}|
{
  type:'FETCH_REQUEST'
  payload: Product[]
}|
{
  type: 'FETCH_FAIL'; payload: string
}


export default function HomePage() {
  return (
    <Row>
      {sampleProducts.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={'/product/'+ product.slug }>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <h6>{product.price}</h6>
          </Link>
          
        </Col>
      ))}
    </Row>
  );
}
