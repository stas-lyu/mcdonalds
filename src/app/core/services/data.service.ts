import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {SignUpComponent} from "../../auth/sign-up/sign-up.component";
import {User} from "../../shared/classes/user";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const categories = [
      {
        id: 0,
        name: 'Beverages',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_drinks_160x160_.jpg?$Category_Mobile$',
      },
      {
        id: 1,
        name: 'Breakfast',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_breakfast_160x160.jpg?$Category_Mobile$',
      },
      {
        id: 2,
        name: 'Desserts & Shakes',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_desserts_&_shakes_160x160_.jpg?$Category_Mobile$',
      },
      {
        id: 3,
        name: 'Snacks & Sides',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_snacks_sides_160x160.jpg?$Category_Mobile$',
      },
      {
        id: 4,
        name: 'Burgers',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_burgers_160x160_.jpg?$Category_Mobile$',
      },
      {
        id: 5,
        name: 'Happy Meal',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_happy_meal_160x160.jpg?$Category_Mobile$',
      },
      {
        id: 6,
        name: 'Chicken & Sandwiches',
        imgUrl: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/category-chicken-n-sandwiches.jpg?$Category_Mobile$',
      },
    ];

    const items = [
        {
          "categoryId": 0,
          "info": [
            {
              id: 0,
              name: "Coca-Cola®",
              category: "Beverages",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Coca-Cola-Classic-Small.jpg?$Product_Desktop$",
              price: 1.99,
              size: ["xs", "s", "m", "xl"],
              cal: 150,
              description: "Coca-Cola® is a refreshing McDonald's soda option that complements all of your menu favorites. Have you ever wondered, is Coke® at McDonald’s different? Visit our Why Does McDonalds Coca Cola Taste So Good FAQ to find out. Enjoy a refreshing Coke® at McDonald’s in extra small, small, medium and large for $1 on the $1 $2 $3 Dollar Menu."
            },
            {
              id: 1,
              name: "Sprite®",
              category: "Beverages",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sprite-Small.jpg?$Product_Desktop$",
              price: 1.99,
              size: ["xs", "s", "m", "xl"],
              cal: 140,
              description: "Sprite® is a delicious lemon-lime fountain drink and is available in sizes extra small, small, medium, and large. Sprite® is a caffeine-free soda that makes the perfect addition to any McDonald’s Combo Meal. There are 140 calories in a Small Sprite® at McDonald's. Get one today with McDelivery® or get it with curbside pickup using Mobile Order & Pay!"
            },
            {
              id: 2,
              name: "Fanta® Orange",
              category: "Beverages",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sprite-Small.jpg?$Product_Desktop$",
              price: 1.99,
              size: ["s", "m", "l"],
              cal: 150,
              description: "McDonald’s Fanta® Orange is a caffeine-free soft drink full of bubbly, refreshing orange flavor. There are 150 calories in a small Fanta® Orange. Fanta® Orange soda is part of McDonald’s $1 Any Size Soft Drinks on the $1 on our $1 $2 $3 Dollar Menu. Available in small, medium, and large fountain drink sizes. Get it today in the App with Mobile Order & Pay!"
            },
            {
              id: 3,
              name: "Hot Tea",
              category: "Beverages",
              imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-hot-tea.jpg?$Product_Desktop$",
              price: 2.40,
              size: ["s", "m", "l"],
              cal: 10,
              description: "McDonald's Hot Tea has a robust black tea flavor with hints of floral and orange notes. There are 10 calories in a small McDonald's Hot Tea. Enjoy a McDonald's hot tea when you order with Mobile Order & Pay! Pair a hot tea with any of our McCafé® Bakery items for the perfect start to your morning."
            },
          ]
        },
      {
        "categoryId": 1,
        "info": [
          {
            id: 0,
            name: "Bacon, Egg & Cheese Biscuit",
            category: "Breakfast",
            imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit.jpg?$Product_Desktop$",
            price: 1.99,
            ingredients: ["Biscuit", "Folded Egg", "Pasteurized Process American Cheese", "Thick Cut Applewood Smoked Bacon", "Salted Butter", "Clarified Butter"],
            cal: 460,
            description: "The McDonald's Bacon, Egg & Cheese Biscuit breakfast sandwich features a warm, buttermilk biscuit brushed with real butter, thick cut Applewood smoked bacon, a fluffy folded egg, and a slice of melty American cheese. There are 460 calories in a Bacon, Egg & Cheese Biscuit at McDonald's. Try one today with a Premium Roast Coffee and order with Mobile Order & Pay on the McDonald's App!"
          },
          {
            id: 1,
            name: "Egg McMuffin®",
            category: "Breakfast",
            imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Egg-McMuffin.jpg?$Product_Desktop$",
            price: 1.99,
            ingredients: ["English Muffin", "Egg", "Canadian Bacon", "Pasteurized Process American Cheese", "Salted Butter", "Clarified Butter"],
            cal: 310,
            description: "Our Egg McMuffin® breakfast sandwich is an excellent source of protein and oh so delicious. We place a freshly cracked Grade A egg on a toasted English Muffin topped with real butter and add lean Canadian bacon and melty American cheese. There are 300 calories in an Egg McMuffin®. Pair it with a Premium Roast Coffee and pass the line when you use Mobile Order & Pay, only on the McDonald’s App!"
          },
          {
            id: 2,
            name: "Sausage Burrito",
            category: "Breakfast",
            imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Burrito.jpg?$Product_Desktop$",
            price: 1.99,
            ingredients: ["Scrambled Egg Sausage And Vegetable Mix", "Flour Tortilla", "Pasteurized Process American Cheese"],
            cal: 150,
            description: "The Sausage Burrito is McDonald's Breakfast Burrito and is loaded with fluffy scrambled egg, pork sausage, melty cheese, green chiles and onion! It's wrapped in a soft tortilla, making it the perfect grab and go breakfast. There are 310 calories in a McDonald's sausage burrito. Order a McDonald's Sausage Burrito using the McDonald's App to Mobile Order & Pay."
          },
          {
            id: 3,
            name: "Hotcakes",
            category: "Breakfast",
            imgUrl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hotcakes.jpg?$Product_Desktop$",
            price: 2.40,
            ingredients: ["Hotcakes", "Hotcake Syrup", "Salted Whipped Butter"],
            cal: 580,
            description: "If you love pancakes, you've got to try McDonald's hotcakes with a side of real butter and sweet maple flavored hotcake syrup. This McDonald's breakfast comes with 3 golden brown hotcakes. There are 580 calories in McDonald's hotcakes. Order it with a Premium Roast Coffee for the perfect breakfast combo. Get an order of McDonald's hotcakes for breakfast using Mobile Order & Pay in the McDonald's App."
          },
        ]
      }
      ]

    const users: User[] = [];

    return {categories, users, items}
  }

  // genId(users: User[]): number {
  //   return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  // }
}
