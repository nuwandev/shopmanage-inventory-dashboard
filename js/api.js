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
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
  }
}

export async function deleteProductById(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
  }
}

export async function addProduct(formData) {
  try {
    const response = await fetch(`https://dummyjson.com/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

export async function updateProduct(id, formData) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
  }
}
