import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const categories = {
      categories: [
        {
          id: 1,
          category: 'Beverages',
        },
        {
          id: 2,
          category: 'Breakfast',
        },
        {
          id: 3,
          category: 'Desserts & Shakes',
        },
        {
          id: 4,
          category: 'Snacks & Sides',
        },
        {
          id: 5,
          category: 'Burgers',
        },
        {
          id: 6,
          category: 'Happy Meal',
        },
        {
          id: 7,
          category: 'Chicken & Sandwiches',
        },
      ],
      items: [
        {
          "categoryId": 1,
          "info": [
            {
              name: "Coca-Cola®",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Coca-Cola-Classic-Small.jpg?$Product_Desktop$",
              price: 1.99,
              size: ["xs", "s", "m", "xl"],
              cal: 150,
              description: "Coca-Cola® is a refreshing McDonald's soda option that complements all of your menu favorites. Have you ever wondered, is Coke® at McDonald’s different? Visit our Why Does McDonalds Coca Cola Taste So Good FAQ to find out. Enjoy a refreshing Coke® at McDonald’s in extra small, small, medium and large for $1 on the $1 $2 $3 Dollar Menu."
            },
            {
              name: "Sprite®",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sprite-Small.jpg?$Product_Desktop$",
              price: 1.99,
              size: ["xs", "s", "m", "xl"],
              cal: 140,
              description: "Sprite® is a delicious lemon-lime fountain drink and is available in sizes extra small, small, medium, and large. Sprite® is a caffeine-free soda that makes the perfect addition to any McDonald’s Combo Meal. There are 140 calories in a Small Sprite® at McDonald's. Get one today with McDelivery® or get it with curbside pickup using Mobile Order & Pay!"
            },
            {
              name: "Fanta® Orange",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sprite-Small.jpg?$Product_Desktop$",
              price: 1.99,
              size: ["s", "m", "l"],
              cal: 150,
              description: "McDonald’s Fanta® Orange is a caffeine-free soft drink full of bubbly, refreshing orange flavor. There are 150 calories in a small Fanta® Orange. Fanta® Orange soda is part of McDonald’s $1 Any Size Soft Drinks on the $1 on our $1 $2 $3 Dollar Menu. Available in small, medium, and large fountain drink sizes. Get it today in the App with Mobile Order & Pay!"
            },
            {
              name: "Hot Tea",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-hot-tea.jpg?$Product_Desktop$",
              price: 2.40,
              size: ["s", "m", "l"],
              cal: 10,
              description: "McDonald's Hot Tea has a robust black tea flavor with hints of floral and orange notes. There are 10 calories in a small McDonald's Hot Tea. Enjoy a McDonald's hot tea when you order with Mobile Order & Pay! Pair a hot tea with any of our McCafé® Bakery items for the perfect start to your morning."
            },
          ]
        }
      ],
      users: [],
    };
    return {categories}
  }
}
