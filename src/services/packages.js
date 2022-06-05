import { marked } from "marked";
import { API_TOKEN, API_URL } from "../config";

export const getPackages = async () => {
  const res = await fetch(`${API_URL}/api/packages?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const jsonData = await res.json();
  const packages = jsonData.data;

  return packages.map((item) => ({
    id: item.id,
    name: item.attributes.name,
    price: item.attributes.price,
    description: marked(item.attributes.description),
    featuredImgUrl: item.attributes.featured_image.data.attributes.url,
  }));
};
