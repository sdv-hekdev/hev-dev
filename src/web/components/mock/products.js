import getRandomPrice from "../helper/getRandomPrice"

const products = [
  {
    id: 1,
    name: "item 1",
    href: "#",
    price: `${getRandomPrice(100, 20)} $`,
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc: "/public/assets/chairs/armchair-1.jpg",
    imageAlt: "item 1",
  },
  {
    id: 2,
    name: "item 2",
    href: "#",
    price: `${getRandomPrice(100, 20)} $`,
    color: "Black",
    inStock: false,
    leadTime: "3-4 weeks",
    size: "Large",
    imageSrc: "",
    imageAlt: "item 2",
  },
  {
    id: 3,
    name: "item 3",
    href: "#",
    price: `${getRandomPrice(100, 20)} $`,
    color: "White",
    inStock: true,
    imageSrc: "",
    imageAlt: "item 3",
  },
]
export default products
