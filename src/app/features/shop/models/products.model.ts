export interface Product {
  id: string;
  name: string;
  subName?: string;
  type: string;
  gender?: string;
  availabledSize: string[];
  color?: string;
  description: {
    composition?: string;
    care?: string;
    origin?: string;
    fit?: string;
    productSize?: string;
    modelHeight?: string;
  };
  price: number;
  imageUrl: string;
  imageUrls?: string[];
  quantity?: number;
}
