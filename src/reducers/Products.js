export const initialState = {
  products: [],
  loading: false,
  loaded: false,
  error: null,
  activeProductIndex: 0,
  selectedSku: null,
  skus: [],
};

export const ProductActionTypes = {
  FETCH_PRODUCTS_BEGIN: "FETCH_PRODUCTS_BEGIN",
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_ERROR: "FETCH_PRODUCTS_ERROR",
  CHANGE_ACTIVE_PRODUCT: "CHANGE_ACTIVE_PRODUCT",
  ACCEPT_PRODUCT: "ACCEPT_PRODUCT",
  CHANGE_SELECTED_SKU: "CHANGE_SELECTED_SKU",
  SET_PRODUCTS_EMPTY: "SET_PRODUCTS_EMPTY",
};

export function productsReducer(state, action) {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        products: action.payload.data,
        productImages: action.payload.data.map(
          (product) => product.images[0].url
        ),
        activeProductIndex: 0,
        selectedSku:
          action.payload.data[0] && action.payload.data[0].selectedSku
            ? action.payload.data[0].selectedSku
            : null,
        skus:
          action.payload.data[0] && action.payload.data[0].skus
            ? action.payload.data[0].skus
            : null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error,
        products: [],
      };
    case ProductActionTypes.CHANGE_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProductIndex: action.payload,
        selectedSku: state.products[action.payload].selectedSku,
        skus: state.products[action.payload].skus,
      };
    case ProductActionTypes.ACCEPT_PRODUCT:
      let products = [...state.products];
      let productImages = [...state.productImages];
      products.splice(action.payload, 1);
      productImages.splice(action.payload, 1);
      return {
        ...state,
        products: products,
        productImages: productImages,
        activeProductIndex: 0,
        selectedSku:
          products[0] && products[0].selectedSku
            ? products[0].selectedSku
            : null,
        skus: products[0] && products[0].skus ? products[0].skus : null,
      };
    case ProductActionTypes.CHANGE_SELECTED_SKU:
      const newAttrsValue = { ...state.selectedSku.attrs };
      let newProducts = [...state.products];

      for (let key in action.payload) {
        newAttrsValue[key] = action.payload[key];
      }

      const newSelectedSku = state.skus.find((sku) =>
        areEqualShallow(sku.attrs, newAttrsValue)
      );
      newProducts[state.activeProductIndex].selectedSku = newSelectedSku;

      return {
        ...state,
        products: newProducts,
        selectedSku: newSelectedSku,
      };
    case ProductActionTypes.SET_PRODUCTS_EMPTY:
      return {
        ...state,
        products: [],
        loading: false,
        loaded: false,
        error: null,
        activeProductIndex: 0,
        selectedSku: null,
        skus: [],
      };
    default:
      return state;
  }
}

function areEqualShallow(a, b) {
  for (let key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (let key in b) {
    if (!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
