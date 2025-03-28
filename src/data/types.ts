export type Size = {
    size: string;
    price: number;
    image: string;
  };
  
  export type Base = {
    name: string;
    image: string;
  };
  
  export type Complement = {
    name: string;
    image: string;
  };
  
  export type Topping = {
    name: string;
    image: string;
  };
  
  export type Extra = {
    name: string;
    price: number;
    image: string;
  };
  
  export type CartItem = {
    id: string;
    size: Size;
    base: Base;
    complements: Complement[];
    topping: Topping;
    extras: Extra[];
    quantity: number;
  };
  
  export type Testimonial = {
    name: string;
    rating: number;
    comment: string;
    image: string;
  }; 