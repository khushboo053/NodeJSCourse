// OBJECT PROPERTY SHORTHAND
const name = "Andrew";
const userAge = 30;

const user = {
  name,
  age: userAge,
  location: "Surat",
};

console.log(user);

// OBJECT DESTRUCTURING
const product = {
  label: "RedLabel",
  price: 200,
  stock: 300,
  salePrice: undefined,
  rating: 4.0,
};

// const label = product.label;
// const stock = product.stock;

// const { label: productLabel, stock, rating = 5 } = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock);
};

transaction("order", product);
transaction("order");
