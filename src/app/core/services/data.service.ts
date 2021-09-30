// import { Injectable } from '@angular/core';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { User } from '../../shared/classes/user';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class DataService implements InMemoryDbService {
//   constructor() {}
//
//   createDb() {
//     const categories = [
//       {
//         id: 0,
//         name: 'Beverages',
//         imgUrl:
//           'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_drinks_160x160_.jpg?$Category_Mobile$',
//       },
//       {
//         id: 1,
//         name: 'Breakfast',
//         imgUrl:
//           'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_breakfast_160x160.jpg?$Category_Mobile$',
//       },
//       {
//         id: 2,
//         name: 'Desserts & Shakes',
//         imgUrl:
//           'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_desserts_&_shakes_160x160_.jpg?$Category_Mobile$',
//       },
//       {
//         id: 3,
//         name: 'Snacks & Sides',
//         imgUrl:
//           'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_snacks_sides_160x160.jpg?$Category_Mobile$',
//       },
//       {
//         id: 4,
//         name: 'Burgers',
//         imgUrl:
//           'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/nav_burgers_160x160_.jpg?$Category_Mobile$',
//       },
//       {
//         id: 5,
//         name: 'Chicken & Sandwiches',
//         imgUrl:
//           'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/nav/category-chicken-n-sandwiches.jpg?$Category_Mobile$',
//       },
//     ];
//
//     const items = [
//       {
//         categoryId: 0,
//         products: [
//           {
//             id: 0,
//             name: 'Coca-Cola®',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Coca-Cola-Classic-Small.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['xs', 's', 'm', 'xl'],
//             cal: 150,
//             description:
//               "Coca-Cola® is a refreshing McDonald's soda option that complements all of your menu favorites. Have you ever wondered, is Coke® at McDonald’s different? Visit our Why Does McDonalds Coca Cola Taste So Good FAQ to find out. Enjoy a refreshing Coke® at McDonald’s in extra small, small, medium and large for $1 on the $1 $2 $3 Dollar Menu.",
//           },
//           {
//             id: 1,
//             name: 'Sprite®',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sprite-Small.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['xs', 's', 'm', 'xl'],
//             cal: 140,
//             description:
//               "Sprite® is a delicious lemon-lime fountain drink and is available in sizes extra small, small, medium, and large. Sprite® is a caffeine-free soda that makes the perfect addition to any McDonald’s Combo Meal. There are 140 calories in a Small Sprite® at McDonald's. Get one today with McDelivery® or get it with curbside pickup using Mobile Order & Pay!",
//           },
//           {
//             id: 2,
//             name: 'Fanta® Orange',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-fanta-orange.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['s', 'm', 'l'],
//             cal: 150,
//             description:
//               'McDonald’s Fanta® Orange is a caffeine-free soft drink full of bubbly, refreshing orange flavor. There are 150 calories in a small Fanta® Orange. Fanta® Orange soda is part of McDonald’s $1 Any Size Soft Drinks on the $1 on our $1 $2 $3 Dollar Menu. Available in small, medium, and large fountain drink sizes. Get it today in the App with Mobile Order & Pay!',
//           },
//           {
//             id: 3,
//             name: 'Hot Tea',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-hot-tea.jpg?$Product_Desktop$',
//             price: 2.4,
//             size: ['s', 'm', 'l'],
//             cal: 10,
//             description:
//               "McDonald's Hot Tea has a robust black tea flavor with hints of floral and orange notes. There are 10 calories in a small McDonald's Hot Tea. Enjoy a McDonald's hot tea when you order with Mobile Order & Pay! Pair a hot tea with any of our McCafé® Bakery items for the perfect start to your morning.",
//           },
//         ],
//       },
//       {
//         categoryId: 1,
//         products: [
//           {
//             id: 0,
//             name: 'Bacon, Egg & Cheese Biscuit',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['default'],
//             ingredients: [
//               'Biscuit',
//               'Folded Egg',
//               'Pasteurized Process American Cheese',
//               'Thick Cut Applewood Smoked Bacon',
//               'Salted Butter',
//               'Clarified Butter',
//             ],
//             cal: 460,
//             description:
//               "The McDonald's Bacon, Egg & Cheese Biscuit breakfast sandwich features a warm, buttermilk biscuit brushed with real butter, thick cut Applewood smoked bacon, a fluffy folded egg, and a slice of melty American cheese. There are 460 calories in a Bacon, Egg & Cheese Biscuit at McDonald's. Try one today with a Premium Roast Coffee and order with Mobile Order & Pay on the McDonald's App!",
//           },
//           {
//             id: 1,
//             name: 'Egg McMuffin®',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Egg-McMuffin.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['default'],
//             ingredients: [
//               'English Muffin',
//               'Egg',
//               'Canadian Bacon',
//               'Pasteurized Process American Cheese',
//               'Salted Butter',
//               'Clarified Butter',
//             ],
//             cal: 310,
//             description:
//               'Our Egg McMuffin® breakfast sandwich is an excellent source of protein and oh so delicious. We place a freshly cracked Grade A egg on a toasted English Muffin topped with real butter and add lean Canadian bacon and melty American cheese. There are 300 calories in an Egg McMuffin®. Pair it with a Premium Roast Coffee and pass the line when you use Mobile Order & Pay, only on the McDonald’s App!',
//           },
//           {
//             id: 2,
//             name: 'Sausage Burrito',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Burrito.jpg?$Product_Desktop$',
//             price: 1.99,
//             ingredients: [
//               'Scrambled Egg Sausage And Vegetable Mix',
//               'Flour Tortilla',
//               'Pasteurized Process American Cheese',
//             ],
//             size: ['default'],
//             cal: 150,
//             description:
//               "The Sausage Burrito is McDonald's Breakfast Burrito and is loaded with fluffy scrambled egg, pork sausage, melty cheese, green chiles and onion! It's wrapped in a soft tortilla, making it the perfect grab and go breakfast. There are 310 calories in a McDonald's sausage burrito. Order a McDonald's Sausage Burrito using the McDonald's App to Mobile Order & Pay.",
//           },
//           {
//             id: 3,
//             name: 'Hotcakes',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hotcakes.jpg?$Product_Desktop$',
//             price: 2.4,
//             ingredients: ['Hotcakes', 'Hotcake Syrup', 'Salted Whipped Butter'],
//             size: ['default'],
//             cal: 580,
//             description:
//               "If you love pancakes, you've got to try McDonald's hotcakes with a side of real butter and sweet maple flavored hotcake syrup. This McDonald's breakfast comes with 3 golden brown hotcakes. There are 580 calories in McDonald's hotcakes. Order it with a Premium Roast Coffee for the perfect breakfast combo. Get an order of McDonald's hotcakes for breakfast using Mobile Order & Pay in the McDonald's App.",
//           },
//         ],
//       },
//       {
//         categoryId: 2,
//         products: [
//           {
//             id: 0,
//             name: 'McFlurry® with OREO® Cookies',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-oreo-mcflurry-snack.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['R', 'SN'],
//             cal: 510,
//             description:
//               "The McDonald’s McFlurry® with OREO® Cookies is an popular combination of OREO® pieces and vanilla soft serve! Available in Regular Size and Snack Size on the McDonald's Desserts & Shakes menu.",
//           },
//           {
//             id: 1,
//             name: 'Hot Caramel Sundae',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hot-Caramel-Sundae.jpg?$Product_Desktop$',
//             price: 1.99,
//             ingredients: [
//               'English Muffin',
//               'Egg',
//               'Canadian Bacon',
//               'Pasteurized Process American Cheese',
//               'Salted Butter',
//               'Clarified Butter',
//             ],
//             size: ['default'],
//             cal: 330,
//             description:
//               "Treat yourself to a Hot Caramel Sundae at McDonald's! This Caramel Sundae combines creamy vanilla soft serve and warm, buttery caramel topping. Order it to complete your McDonald's meal using Mobile Order & Pay!",
//           },
//           {
//             id: 2,
//             name: 'Strawberry Shake',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Burrito.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['S', 'M', 'L'],
//             cal: 530,
//             description:
//               "McDonald's Strawberry Shake is made with creamy vanilla soft serve, blended with strawberry syrup and topped with whipped topping. There are 530 calories in a small Strawberry Shake at McDonald's. Available in small, medium, and large. Get your Strawberry Shake through the drive thru or with McDonald's curbside pickup when you Mobile Order & Pay! McDonald's App download and registration required.",
//           },
//           {
//             id: 3,
//             name: 'Hotcakes',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hotcakes.jpg?$Product_Desktop$',
//             price: 2.4,
//             ingredients: ['Hotcakes', 'Hotcake Syrup', 'Salted Whipped Butter'],
//             size: ['default'],
//             cal: 580,
//             description:
//               "If you love pancakes, you've got to try McDonald's hotcakes with a side of real butter and sweet maple flavored hotcake syrup. This McDonald's breakfast comes with 3 golden brown hotcakes. There are 580 calories in McDonald's hotcakes. Order it with a Premium Roast Coffee for the perfect breakfast combo. Get an order of McDonald's hotcakes for breakfast using Mobile Order & Pay in the McDonald's App.",
//           },
//         ],
//       },
//       {
//         categoryId: 3,
//         products: [
//           {
//             id: 0,
//             name: 'World Famous Fries®',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-fries-small.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['S', 'M', 'L'],
//             cal: 220,
//             description:
//               "McDonald's World Famous Fries® are made with premium potatoes such as the Russet Burbank and the Shepody. With 0g of trans fat per labeled serving, these epic fries are crispy and golden on the outside and fluffy on the inside. Best of all, you can get medium Fries for free every Friday with any $1 purchase, exclusively in the McDonald’s App. Grab our World Famous Fries® and pair with one of our classic McDonald’s Burgers today! There are 220 calories in a small McDonald's fries. Order your fries today with McDelivery® or get them with curbside pickup using Mobile Order & Pay!",
//           },
//           {
//             id: 1,
//             name: 'Apple Slices',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Apple-Slices.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['default'],
//             ingredients: [
//               'English Muffin',
//               'Egg',
//               'Canadian Bacon',
//               'Pasteurized Process American Cheese',
//               'Salted Butter',
//               'Clarified Butter',
//             ],
//             cal: 15,
//             description:
//               'McDonald’s Apple Slices are a wholesome, tasty side made from real apples. Specially selected varieties mean our apple slices are always crisp and juicy, making for a tasty snack with 15 calories per labelled serving. Enjoy it as a Snack or Side to your meal!',
//           },
//         ],
//       },
//       {
//         categoryId: 4,
//         products: [
//           {
//             id: 0,
//             name: 'Big Mac®',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Big-Mac.jpg?$Product_Desktop$',
//             price: 19.99,
//             ingredients: [
//               'Big Mac Bun',
//               '100% Beef Patty',
//               'Shredded Lettuce',
//               'Big Mac Sauce',
//               'Pasteurized Process American Cheese',
//               'Pickle Slices',
//             ],
//             size: ['default'],
//             cal: 550,
//             description:
//               'Mouthwatering perfection starts with two 100% pure beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It’s topped off with pickles, crisp shredded lettuce, finely chopped onion and American cheese for a 100% beef burger with a taste like no other. It contains no artificial flavors, preservatives or added colors from artificial sources.* Our pickle contains an artificial preservative, so skip it if you like. There are 550 calories in a Big Mac®. Order one today with McDelivery®!',
//           },
//           {
//             id: 1,
//             name: 'Hamburger',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hamburger.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['default'],
//             ingredients: [
//               'Regular Bun',
//               '100% Beef Patty',
//               'Ketchup',
//               'Pickle Slices',
//               'Onions',
//               'Mustard',
//             ],
//             cal: 250,
//             description:
//               'The original burger starts with a 100% pure beef burger seasoned with just a pinch of salt and pepper. Then, the McDonald’s burger is topped with a tangy pickle, chopped onions, ketchup and mustard. McDonald’s hamburger contains no artificial flavors, preservatives or added colors from artificial sources.* Our pickle contains an artificial preservative, so skip it if you like.',
//           },
//           {
//             id: 2,
//             name: 'Cheeseburger',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Cheeseburger.jpg?$Product_Desktop$',
//             price: 1.99,
//             size: ['default'],
//             cal: 300,
//             description:
//               'MOur simple, classic cheeseburger begins with a 100% pure beef burger seasoned with just a pinch of salt and pepper. The McDonald’s Cheeseburger is topped with a tangy pickle, chopped onions, ketchup, mustard, and a slice of melty American cheese. It contains no artificial flavors, preservatives or added colors from artificial sources.* Our pickle contains an artificial preservative, so skip it if you like. For more delicious burger variations explore the McDonald’s burger menu.',
//           },
//           {
//             id: 3,
//             name: 'Quarter Pounder®* with Cheese',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Quarter-Pounder-with-Cheese.jpg?$Product_Desktop$',
//             price: 2.4,
//             size: ['default'],
//             ingredients: [
//               'Quarter Pound 100% Beef Patty*',
//               'Quarter Pound Bun',
//               'Pasteurized Process American Cheese',
//               'Ketchup',
//               'Pickle Slices',
//               'Onions',
//             ],
//             cal: 520,
//             description:
//               'Each Quarter Pounder® with Cheese burger features a ¼ lb.* of 100% fresh beef that’s hot, deliciously juicy and cooked when you order. It’s seasoned with just a pinch of salt and pepper, sizzled on a flat iron grill, then topped with slivered onions, tangy pickles and two slices of melty American cheese on a sesame seed bun. Our QPC® contains no artificial flavors, preservatives or added colors from artificial sources. **Our pickle contains an artificial preservative, so skip it if you like.A Quarter Pounder® with Cheese has 520 Calories. Order one today with Mobile Order & Pay!',
//           },
//         ],
//       },
//       {
//         categoryId: 5,
//         products: [
//           {
//             id: 0,
//             name: 'Spicy Deluxe Crispy Chicken Sandwich',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-spicy-deluxe-crispy-chicken-sandwich.jpg?$Product_Desktop$',
//             price: 8.4,
//             ingredients: [
//               'Crispy Chicken Fillet',
//               'Potato Roll',
//               'Roma Tomato',
//               'Spicy Pepper Sauce',
//               'Shredded Lettuce',
//             ],
//             size: ['default'],
//             cal: 540,
//             description:
//               'The Spicy Deluxe Crispy Chicken is big on everything, including heat. Our southern-style fried chicken fillet on a potato roll, topped with shredded lettuce, Roma tomatoes and Spicy Pepper Sauce kicks crispy, juicy and tender up to the highest level. The Spicy Deluxe Crispy Chicken sandwich has 540 calories. Check out all the Crispy Chicken Sandwiches. Order one today in the McDonald’s app.',
//           },
//           {
//             id: 1,
//             name: 'McChicken®',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-McChicken.jpg?$Product_Desktop$',
//             price: 1.99,
//             ingredients: [
//               'McChicken Patty',
//               'Regular Bun',
//               'Shredded Lettuce',
//               'Mayonnaise',
//             ],
//             size: ['default'],
//             cal: 400,
//             description:
//               "It’s a classic for a reason. Savor the satisfying crunch of our juicy chicken patty, topped with shredded lettuce and just the right amount of creamy mayonnaise, all served on a perfectly toasted bun.* The McChicken® has 400 calories. Get your McChicken® at the drive thru or with McDonald's Curbside pickup when you Mobile Order & Pay! McDonald's App download and registration required.",
//           },
//           {
//             id: 2,
//             name: 'Crispy Chicken Sandwich',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-crispy-chicken-sandwich.jpg?$Product_Desktop$',
//             price: 1.99,
//             ingredients: [
//               'Crispy Chicken Fillet',
//               'Potato Roll',
//               'Crinkle Cut Pickle',
//               'Salted Butter',
//             ],
//             size: ['default'],
//             cal: 530,
//             description:
//               "McDonald's Crispy Chicken Sandwich is a southern style fried chicken sandwich that's crispy, juicy and tender perfection. It’s topped with crinkle-cut pickles and served on a toasted, buttered potato roll. The Crispy Chicken sandwich has 470 calories. Check out all the Crispy Chicken Sandwiches. Order one today in the McDonald’s app.",
//           },
//           {
//             id: 3,
//             name: 'Spicy Crispy Chicken Sandwich',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-spicy-crispy-chicken-sandwich.jpg?$Product_Desktop$',
//             price: 5.4,
//             ingredients: [
//               'Crispy Chicken Fillet',
//               'Potato Roll',
//               'Spicy Pepper Sauce',
//               'Crinkle Cut Pickle',
//             ],
//             size: ['default'],
//             cal: 530,
//             description:
//               'With our Spicy Pepper Sauce topping the southern style fried chicken fillet on a toasted potato roll, this sandwich was made for those who like it crispy, juicy, tender and hot. The Spicy Crispy Chicken sandwich has 530 calories. Check out all the Crispy Chicken Sandwiches. Order one today in the McDonald’s app.',
//           },
//           {
//             id: 4,
//             name: 'Deluxe Crispy Chicken Sandwich',
//             imgUrl:
//               'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-deluxe-crispy-chicken-sandwich.jpg?$Product_Desktop$',
//             price: 8.4,
//             ingredients: [
//               'Crispy Chicken Fillet',
//               'Potato Roll',
//               'Roma Tomato',
//               'Mayonnaise',
//               'Shredded Lettuce',
//             ],
//             size: ['default'],
//             cal: 530,
//             description:
//               'Get a little extra with toppings. Go deluxe with shredded lettuce, Roma tomatoes and mayo to take crispy, juicy and tender to the next level. The Deluxe Crispy Chicken sandwich has 530 calories. Check out all the Crispy Chicken Sandwiches. Order one today in the McDonald’s app.',
//           },
//         ],
//       },
//     ];
//
//     const users = [
//       { id: 1, email: 'admin@admin.admin', password: '123456', isAdmin: true },
//     ];
//
//     return { categories, users, items };
//   }
//
//   genId(users: User[]): number {
//     return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
//   }
// }
