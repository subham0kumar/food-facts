export const productsByCategory = (category, page) => {
  `https://world.openfoodfacts.org/category/${category}.json$page=${page}`;
};

export const productsByName = (name, page) => {
  `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&json=true$page=${page}`;
};

export const productsByBarcode = (barcode) => {
  `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
};
