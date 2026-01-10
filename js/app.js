import { getProducts } from "./api.js";
import { showState } from "./state.js";

const appState = {
  pagination: {
    currentPage: 1,
    productsPerPage: 10,
    totalProducts: 0,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupPagination();
});

async function loadProducts(page = 1) {
  try {
    showState("loading-state");

    const { productsPerPage } = appState.pagination;
    const skip = (page - 1) * productsPerPage;
    const data = await getProducts({ limit: productsPerPage, skip });

    if (data?.products?.length) {
      appState.pagination.currentPage = page;
      appState.pagination.totalProducts = data.total;
      showState("product-table-container");
      displayProducts(data.products);
      updatePagination();
    } else {
      showState("empty-state");
    }
  } catch (error) {
    showState("error-state");
    console.error(error);
  }
}

function displayProducts(products) {
  const tableBody = document.getElementById("product-table-body");
  tableBody.innerHTML = "";
  products.forEach((product) => {
    const row = createProductRow(product);
    tableBody.appendChild(row);
  });
}

function createProductRow(product) {
  const row = document.createElement("tr");
  row.className = "hover:bg-gray-50 transition-colors";
  row.dataset.productId = product.id;

  let stockClass;
  if (product.stock > 50) {
    stockClass = "bg-green-100 text-green-800";
  } else if (product.stock > 0) {
    stockClass = "bg-yellow-100 text-yellow-800";
  } else {
    stockClass = "bg-red-100 text-red-800";
  }

  row.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
          <img class="h-12 w-12 object-cover" src="${product.thumbnail}" alt="${
    product.title
  }">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">${product.title}</div>
          <div class="text-sm text-gray-500">SKU: ${product.sku}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        ${product.category}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      $${product.price.toFixed(2)}
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockClass}">
        ${product.stock} in stock
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span class="ml-1 text-sm text-gray-700">${product.rating.toFixed(
          2
        )}</span>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button class="edit-btn text-blue-600 hover:text-blue-900 mr-4 focus:outline-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      </button>
      <button class="delete-btn text-red-600 hover:text-red-900 focus:outline-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </td>
  `;

  return row;
}

function updatePagination() {
  const { currentPage, productsPerPage, totalProducts } = appState.pagination;
  const start = (currentPage - 1) * productsPerPage + 1;
  const end = currentPage * productsPerPage;

  document.getElementById("pagination-start").textContent = start;
  document.getElementById("pagination-end").textContent = end;
  document.getElementById("pagination-total").textContent = totalProducts;

  const prevBtn = document.getElementById("pagination-prev");
  const nextBtn = document.getElementById("pagination-next");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * productsPerPage >= totalProducts;
}

function setupPagination() {
  document.getElementById("pagination-prev").addEventListener("click", () => {
    if (appState.pagination.currentPage > 1) {
      loadProducts(appState.pagination.currentPage - 1);
    }
  });

  document.getElementById("pagination-next").addEventListener("click", () => {
    const { currentPage, productsPerPage, totalProducts } = appState.pagination;
    if (currentPage * productsPerPage < totalProducts) {
      loadProducts(currentPage + 1);
    }
  });
}
