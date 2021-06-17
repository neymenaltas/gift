import React, { useState, useEffect } from "react";
import { getProducts } from "../api/ProductsAPI";
import useProducts from "../context/ProductStore";
import Attributes from "../components/Attributes";
import styled from "styled-components";
import Modal from "../components/Modal";
import AcceptanceModal from "../components/AcceptanceModal";
import WelcomeModal from "../components/WelcomeModal";
import InputsArea from "../components/InputsArea";
import Spinner from "../components/Spinner";
import Carousel from "../components/Carousel";
import { ProductActionTypes } from "../reducers/Products";

const ProductsPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
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
  const [sendButtonPushed, setSendButtonPushed] = useState(true);

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
        setSendButtonPushed(false);
      } catch (error) {
        if (!ignore) {
          dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_ERROR, error });
        }
        setSendButtonPushed(false);
      }
    }

    if (productIds && sendButtonPushed) {
      fetchProducts();
    } else if (!productIds) {
      dispatch({ type: ProductActionTypes.SET_PRODUCTS_EMPTY });
    }
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendButtonPushed, merchantCode, productIds]);

  useEffect(() => {
    const enteredBefore = localStorage.getItem("enteredBefore");
    if (!enteredBefore) {
      setShowWelcomeModal(true);
      localStorage.setItem("enteredBefore", "false");
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
    setSendButtonPushed(true);
    setMerchantCode(merchantCode);
    setProductIds(productIds);
  };

  const renderWelcomeModal = () => {
    return (
      <Modal>
        <WelcomeModal toggleModal={() => setShowWelcomeModal(false)} />
      </Modal>
    );
  };

  const renderAcceptanceModal = () => {
    return (
      <Modal>
        <AcceptanceModal
          toggleModal={() => setShowAcceptanceModal(false)}
          selectedSkuId={selectedSkuId}
        />
      </Modal>
    );
  };

  const renderLoading = () => {
    return (
      <ProductArea>
        <SpinnerArea>
          <Spinner />
        </SpinnerArea>
      </ProductArea>
    );
  };

  const renderNoProductFound = () => {
    return (
      <ProductArea>
        <NoProductSpan>No products found</NoProductSpan>
      </ProductArea>
    );
  };

  const renderCarousel = () => {
    return (
      <div>
        <Carousel
          activeProductIndex={activeProductIndex}
          productImages={productImages}
          changeActiveProduct={changeActiveProduct}
        />
      </div>
    );
  };

  return (
    <ProductsPageContainer>
      {showWelcomeModal && renderWelcomeModal()}
      {showAcceptanceModal && renderAcceptanceModal()}

      <InputsArea match={match} handleRequest={handleRequest} />

      {loading && renderLoading()}

      {productImages &&
        productImages.length > 1 &&
        !loading &&
        renderCarousel()}

      {!products.length && loaded && renderNoProductFound()}

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
