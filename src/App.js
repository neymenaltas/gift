import "./App.css";
import { ProductsProvider } from "./context/ProductStore";
import Products from "./pages/Products";
import Header from "./components/Header";
import { ThemeStore } from "./context/ThemeStore";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Theme from "./Theme";

export const App = () => {
  return (
    <ThemeStore>
      <Theme>
        <Router>
          <div>
            <Header />
            <ProductsProvider>
              <Route exact path="/" component={Products} />
              <Route path="/:id" component={Products} />
            </ProductsProvider>
          </div>
        </Router>
      </Theme>
    </ThemeStore>
  );
};

export default App;
