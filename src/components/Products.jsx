import React, { useState, useEffect } from "react";
import { getProducts } from "../api/ProductsAPI";
import useProducts from "../context/ProductStore";
import Attributes from "./Attributes";
import styled from "styled-components";
import Modal from "./Modal";
import AcceptanceModal from "./AcceptanceModal";
import WelcomeModal from "./WelcomeModal";
import InputsArea from "./InputsArea";
import Spinner from "./Spinner";
import Carousel from "./Carousel";
import { ProductActionTypes } from "../reducers/Products";

const ProductsPageContainer = styled("div")`
  height: 90vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductArea = styled("div")`
  display: flex;
  flex: 1;
  align-items: center;
`;

const ProductContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImageAndDetails = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const ImageContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 200px;
  margin-top: 16px;
`;

const ProductDetails = styled("div")`
  display: flex;
  width: 100%;
  max-height: 144px;
  overflow-y: scroll;
  justify-content: center;
  margin-top: 16px;
`;

const ProductImage = styled("img")`
  max-width: 100%;
  max-height: 100%;
`;

const ProductNameAndAttributes = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled("h1")`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 28px;
  }
`;

const AttributesArea = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const AcceptButtonArea = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 28px;
`;

const AcceptButton = styled("button")`
  width: 120px;
  cursor: pointer;
`;

const DisabledButton = styled("button")`
  width: 120px;
  cursor: not-allowed;
  background-color: gray;
`;

const NoProductSpan = styled("span")`
  width: 100%;
  text-align: center;
`;

const SpinnerArea = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Products = ({ match }) => {
  const {
    state: {
      products,
      selectedSku,
      productImages,
      activeProductIndex,
      loading,
      loaded,
    },
    dispatch,
  } = useProducts();

  const [productIds, setProductIds] = useState(match.params.id);
  const [merchantCode, setMerchantCode] = useState("vineyardvines");
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [selectedSkuId, setSelectedSkuId] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_BEGIN });
      try {
        const payload = await getProducts(
          merchantCode,
          productIds.split(/[\s,]+/)
        );
        if (!ignore) {
          dispatch({
            type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
            payload: payload.data,
          });
        }
      } catch (error) {
        if (!ignore) {
          dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_ERROR, error });
        }
      }
    }

    if (productIds) {
      fetchProducts();
    } else {
      dispatch({ type: ProductActionTypes.SET_PRODUCTS_EMPTY });
    }

    return () => {
      ignore = true;
    };
  }, [merchantCode, productIds]);

  useEffect(() => {
    const isFirstTime = localStorage.getItem("firstTime");
    if (isFirstTime || isFirstTime === "false") {
    } else {
      setShowWelcomeModal(true);
      localStorage.setItem("firstTime", "false");
    }
  }, []);

  const changeActiveProduct = (index) => {
    dispatch({
      type: ProductActionTypes.CHANGE_ACTIVE_PRODUCT,
      payload: index,
    });
  };

  const handleAccept = () => {
    setSelectedSkuId(selectedSku.sku);
    setShowAcceptanceModal(true);
    dispatch({
      type: ProductActionTypes.ACCEPT_PRODUCT,
      payload: activeProductIndex,
    });
  };

  const handleRequest = (merchantCode, productIds) => {
    setMerchantCode(merchantCode);
    setProductIds(productIds);
  };

  return (
    <ProductsPageContainer>
      {showWelcomeModal && (
        <Modal>
          <WelcomeModal
            toggleModal={() => setShowWelcomeModal(false)}
          ></WelcomeModal>
        </Modal>
      )}

      {showAcceptanceModal && (
        <Modal>
          <AcceptanceModal
            toggleModal={() => setShowAcceptanceModal(false)}
            selectedSkuId={selectedSkuId}
          ></AcceptanceModal>
        </Modal>
      )}

      <InputsArea match={match} handleRequest={handleRequest} />

      {loading && (
        <ProductArea>
          <SpinnerArea>
            <Spinner />
          </SpinnerArea>
        </ProductArea>
      )}

      {productImages && productImages.length > 1 && !loading && (
        <Carousel
          activeProductIndex={activeProductIndex}
          productImages={productImages}
          changeActiveProduct={changeActiveProduct}
        />
      )}

      {!products.length && loaded && (
        <ProductArea>
          <NoProductSpan>No products found</NoProductSpan>
        </ProductArea>
      )}

      {products.length && loaded ? (
        <ProductArea>
          <ProductContainer>
            <ProductImageAndDetails>
              <ImageContainer>
                <ProductImage
                  src={selectedSku.images[0]}
                  alt={selectedSku.images[0]}
                />
              </ImageContainer>
              <ProductDetails
                dangerouslySetInnerHTML={{
                  __html: products[activeProductIndex].shortDesc,
                }}
              />
            </ProductImageAndDetails>
            <ProductNameAndAttributes>
              <ProductName>{products[activeProductIndex].name}</ProductName>
              {!selectedSku.orderable && (
                <span> -- Selection is not available --</span>
              )}
              <AttributesArea>
                <Attributes />
              </AttributesArea>
              <AcceptButtonArea>
                {selectedSku.orderable ? (
                  <AcceptButton onClick={() => handleAccept()}>
                    Accept
                  </AcceptButton>
                ) : (
                  <DisabledButton>Not Orderable</DisabledButton>
                )}
              </AcceptButtonArea>
            </ProductNameAndAttributes>
          </ProductContainer>
        </ProductArea>
      ) : null}
    </ProductsPageContainer>
  );
};

export default Products;