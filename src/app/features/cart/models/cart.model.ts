export interface CartItem {
  id: string;
  name: string;
  type: string;
  color?: string;
  price: number;
  imageUrl: string;
  userId: string;
  cartItemId: string;
  selectedSize?: string;
}
