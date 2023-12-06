import { ProductDevelopmentBriefDto } from '../../app/generate';
import ProductionsTable from './ProductionsTable';
import { productions } from './mock';

export type ProductionQuery = {
  productDevelopment: ProductDevelopmentBriefDto;
  sourcing: {
    name: string;
    productions: {
      id: string;
      vendorName: string;
      comment: string;
      sl: number;
      bl: number;
      moq: number;
      tool: number;
      sample: number;
      cur: string;
      qtyPur: {
        qty: number;
        pur: number;
      }[];
    }[];
  }[];
};

const ProductionsTableContainer = () => {
  return <ProductionsTable productions={productions} />;
};

export default ProductionsTableContainer;
