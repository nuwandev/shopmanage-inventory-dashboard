function hideAllStates() {
  document.getElementById("product-table-container").classList.add("hidden");
  document.getElementById("loading-state").classList.add("hidden");
  document.getElementById("empty-state").classList.add("hidden");
  document.getElementById("error-state").classList.add("hidden");
}

function showState(state) {
  hideAllStates();
  document.getElementById(state).classList.remove("hidden");
}

export { showState };
