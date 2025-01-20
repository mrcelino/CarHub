export interface BrandProps {
  name: string;
  image: string;
}

export interface AboutProps{
  name: string;
  image: string;
  desc: string;
}
export const AboutData: AboutProps[] = [
  {
    name: "Quality Choice",
    image: "/ic_quality.svg",
    desc: "We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more."
  },
  {
    name: "Affordable Prices",
    image: "/ic_affordable.svg",
    desc: "Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips without breaking the bank.",
  },
  {
    name: "Convenient Online Booking",
    image: "/ic_verified.svg",
    desc: "With our easy-to-use online booking system, customers can quickly and conveniently reserve their rental car from anywhere, anytime.",
  },
]


export const carBrands: BrandProps[] = [
  {
    name: "Mercedes Benz",
    image: "/ic_mercedes.svg"
  },
  {
    name: "BMW",
    image: "/ic_bmw.svg"
  },
  {
    name: "Audi",
    image: "/ic_audi.svg"
  },  {
    name: "Toyota",
    image: "/ic_toyota.svg"
  },
  {
    name: "Honda",
    image: "/ic_honda.svg"
  },
  {
    name: "Tesla",
    image: "/ic_tesla.svg"
  },
  {
    name: "Hyundai",
    image: "/ic_hyundai.svg"
  },
  {
    name: "Nissan",
    image: "/ic_nissan.svg"
  },
  {
    name: "Volkswagen",
    image: "/ic_volkswagen.svg"
  },
  {
    name: "Ford",
    image: "/ic_ford.svg"
  },
  {
    name: "KIA",
    image: "/ic_kia.svg"
  },
    {
    name: "Mitsubishi",
    image: "/ic_mitsubishi.svg"
  },
];

export const carTypes: BrandProps[] = [
  {
    name: "Sedan",
    image: "/body_sedan.svg"
  },
  {
    name: "SUV",
    image: "/body_suv.svg"
  },
  {
    name: "Coupe",
    image: "/body_coupe.svg"
  },
  {
    name: "Sport Coupe",
    image: "/body_sportcoupe.svg"
  },
  {
    name: "Wagon",
    image: "/body_wagon.svg"
  },
  {
    name: "Compact",
    image: "/body_compact.svg"
  },
];