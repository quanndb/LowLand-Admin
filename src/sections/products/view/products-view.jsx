import { useState } from 'react';
import { Box, Pagination, Typography, Grid, Container, Button } from '@mui/material';
import ProductCard from '../product-card';
import ProductDetailModal from './ProductDetailModal';
import AddProductModal from './AddProductModal'; 
import { sp } from 'src/_mock/sp';

export default function ProductsView() {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct({
      ...product,
      materials: product.materials.map((material) => ({
        name: material.name,
        value: material.value,
        unit: '',
      })),
      size: product.size.map((item) => ({
        name: item.name,
        price: item.price
      })),
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    // For demonstration, we'll just log the new product
    console.log('Adding new product:', newProduct);
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const productsPerPage = 8;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sp.slice(startIndex, endIndex);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard product={product} onClick={() => handleProductClick(product)} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(sp.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>

      <ProductDetailModal product={selectedProduct} open={modalOpen} onClose={handleCloseModal} />
      
      {/* Render AddProductModal */}
      <AddProductModal open={addModalOpen} onClose={handleCloseAddModal} onAddProduct={handleAddProduct} />
    </Container>
  );
}
