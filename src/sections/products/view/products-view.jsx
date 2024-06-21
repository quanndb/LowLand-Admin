import { useState } from "react";
import { sp } from "src/_mock/sp";
import ProductCard from "../product-card";

// import ProductDetailModal from "./ProductDetailModal";
import {Box, Pagination, Typography, Grid, Container} from "@mui/material";


export default function ProductsView() {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleProductClick = (sp) => {
    setSelectedProduct(sp);
    setModalOpen(true);
  };
const productsPerPage =8;
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = sp.slice(startIndex, endIndex);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
              onClick={() => handleProductClick(product)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(sp.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>

      {/* <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onClose={handleCloseModal}
      /> */}
    </Container>
  );
}
