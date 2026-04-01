import { Bath, Eye, Tv, Users, Wifi, Wind } from "lucide-react";

export type Room = {
  id: string;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: {
    wifi: boolean;
    ac: boolean;
    seaview: boolean;
    tv: boolean;
    bathroom: boolean;
    family: boolean;
  };
  details: string[];
};

export const ROOMS: Room[] = [
  {
    id: "standart",
    name: "Стандартна стая",
    description:
      "Уютна и функционална стая за двама с балкон и морска гледка. Идеална за двойки или самотни пътуващи.",
    image: "/images/Double_room.JPG",
    gallery: [
      "/images/Double_room.JPG",
      "/images/Bathroom_1.JPG",
      "/images/pool.jpg",
    ],
    amenities: {
      wifi: true,
      ac: true,
      seaview: true,
      tv: true,
      bathroom: true,
      family: false,
    },
    details: [
      "Двойно легло",
      "Балкон с морска гледка",
      "Климатик",
      "LED телевизор",
      "Частна баня",
      "Безплатен WiFi",
    ],
  },
  {
    id: "deluxe",
    name: "Делукс стая",
    description:
      "Просторна стая с голяма тераса и панорамна морска гледка. Перфектна за романтична почивка.",
    image: "/images/Double_room_2.jpg",
    gallery: [
      "/images/Double_room_2.jpg",
      "/images/Bathroom_2.JPG",
      "/images/pool_2.jpg",
    ],
    amenities: {
      wifi: true,
      ac: true,
      seaview: true,
      tv: true,
      bathroom: true,
      family: false,
    },
    details: [
      "King-size двойно легло",
      "Голяма тераса с морска гледка",
      "Климатик",
      "Smart телевизор",
      "Луксозна баня с душ",
      "Безплатен WiFi",
      "Мини-бар",
    ],
  },
  {
    id: "family",
    name: "Семейна стая",
    description:
      "Просторна стая за цялото семейство с допълнителни легла и всички необходими удобства.",
    image: "/images/Apartment_1.JPG",
    gallery: [
      "/images/Apartment_1.JPG",
      "/images/Apartment_3.jpg",
      "/images/Apartment_4.jpg",
      "/images/Bathroom_3.jpg",
    ],
    amenities: {
      wifi: true,
      ac: true,
      seaview: true,
      tv: true,
      bathroom: true,
      family: true,
    },
    details: [
      "Едно двойно + едно единично легло",
      "Балкон с морска гледка",
      "Климатик",
      "LED телевизор",
      "Частна баня",
      "Безплатен WiFi",
      "Допълнителни детски удобства",
    ],
  },
  {
    id: "suite",
    name: "Апартамент Сюит",
    description:
      "Нашата изключителна стая с отделна хол зона, огромна тераса и неповторима морска панорама.",
    image: "/images/Apartment_2.JPG",
    gallery: [
      "/images/Apartment_2.JPG",
      "/images/Apartment_5.jpg",
      "/images/bedroom_in_apartment.jpg",
      "/images/terrace_apartment_1.jpg",
    ],
    amenities: {
      wifi: true,
      ac: true,
      seaview: true,
      tv: true,
      bathroom: true,
      family: true,
    },
    details: [
      "King-size двойно легло",
      "Отделна хол зона",
      "Голяма тераса с пълна морска панорама",
      "Климатик",
      "Smart телевизор",
      "Луксозна баня с вана и душ",
      "Безплатен WiFi",
      "Мини-бар",
      "Espresso машина",
    ],
  },
];

export const AMENITY_ICONS = {
  wifi: { icon: Wifi, label: "WiFi" },
  ac: { icon: Wind, label: "Климатик" },
  seaview: { icon: Eye, label: "Морска гледка" },
  tv: { icon: Tv, label: "Телевизор" },
  bathroom: { icon: Bath, label: "Баня" },
  family: { icon: Users, label: "Семейна" },
};
