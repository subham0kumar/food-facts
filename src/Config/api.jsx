export const productsByCategory = (category, page) => {
  `https://world.openfoodfacts.org/category/${category}.json$page=${page}`;
};

export const productsByName = (name, page = 1) => {
  if (!name) return null;
  return `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(name)}&json=1&page=${page}`;
};

export const productsByBarcode = (barcode) => {
  if (!barcode) return null;
  return `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`;
};
