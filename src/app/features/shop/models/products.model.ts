export interface Product {
  id: number;
  name: string;
  type?: string;
  gender?: string;
  availabledSize?: string[];
  color?: string;
  description: string;
  price: string;
  imageUrl: string;
  imageUrls?: string[];
}
