export async function getProducts({ limit = 10, skip = 0 } = {}) {
  try {
    const params = new URLSearchParams();
    if (typeof limit === "number") params.append("limit", limit);
    if (typeof skip === "number" && skip > 0) params.append("skip", skip);

    const url = `https://dummyjson.com/products${
      params.toString() ? "?" + params.toString() : ""
    }`;
    const response = await fetch(url);
    const data = await response.json();
    return data; // Return full response with total, products, skip, limit
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
