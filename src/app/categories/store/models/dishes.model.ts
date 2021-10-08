export interface Dish {
  id: number;
  categoryId: number;
  ingredients?: [];
  name: string;
  imgUrl: string;
  price: number;
  cal: number;
  description: string;
}

export interface DishesActionModel {
  payload: Dish;
  type: string;
}
