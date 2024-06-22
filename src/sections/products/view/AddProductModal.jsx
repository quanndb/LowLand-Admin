// import {CloseIcon} from "@mui/icons-material";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { sizes } from "src/_mock/sizes";

const AddProductModal = ({ open, onClose, onAddProduct }) => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialValue, setNewMaterialValue] = useState("");
  const [newMaterials, setNewMaterials] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");
  const [newSizes, setNewSizes] = useState([]);
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState("");
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState("");

  const handleAddProduct = () => {
    const newProduct = {
      name: newProductName,
      originalPrices: newProductPrice,
      salePrices: newDescription,
      materials: newMaterials,
      sizes: newSizes,
      images: [imagePreviewUrl1, imagePreviewUrl2].filter(Boolean), // Filter out empty URLs
    };

    onAddProduct(newProduct);

    // Clear input fields and close the modal
    setNewProductName("");
    setNewProductPrice("");
    setNewDescription("");
    setNewMaterials([]);
    setNewSizes([]);
    setSelectedSize("");
    setNewSizePrice("");
    setImageFile1(null);
    setImageFile2(null);
    setImagePreviewUrl1("");
    setImagePreviewUrl2("");
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAddMaterial = () => {
    if (newMaterialName.trim() && newMaterialValue.trim()) {
      const newMaterial = {
        name: newMaterialName,
        value: newMaterialValue,
      };
      setNewMaterials([...newMaterials, newMaterial]);
      setNewMaterialName("");
      setNewMaterialValue("");
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddSize = () => {
    if (selectedSize && newSizePrice.trim()) {
      const newSize = {
        id: selectedSize,
        price: newSizePrice,
      };
      setNewSizes([...newSizes, newSize]);
      setSelectedSize("");
      setNewSizePrice("");
    }
  };

  const handleImageChange = (event, setImageFile, setImagePreviewUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (setImageFile, setImagePreviewUrl) => {
    setImageFile(null);
    setImagePreviewUrl("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent sx={{ width: 600, height: 540 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Add Product Tabs"
        >
          <Tab label="Details" />
          <Tab label="Add Material" />
          <Tab label="Add Size" />
        </Tabs>
        {currentTab === 0 && (
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              gap={2}
              sx={{ m: 1 }}
            >
              <Box
                onClick={() => document.getElementById("imageUpload1").click()}
                sx={{
                  width: "48%",
                  height: 200,
                  border: "2px dashed grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  backgroundImage: `url(${imagePreviewUrl1 || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imagePreviewUrl1 && <Typography variant="h4">+</Typography>}
                {imagePreviewUrl1 && (
                  <IconButton
                    onClick={() =>
                      handleRemoveImage(setImageFile1, setImagePreviewUrl1)
                    }
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "white",
                    }}
                  >
                    {/* <CloseIcon /> */}
                    x
                  </IconButton>
                )}
                <input
                  type="file"
                  id="imageUpload1"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    handleImageChange(e, setImageFile1, setImagePreviewUrl1)
                  }
                />
              </Box>
              <Box
                onClick={() => document.getElementById("imageUpload2").click()}
                sx={{
                  width: "48%",
                  height: 200,
                  border: "2px dashed grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  backgroundImage: `url(${imagePreviewUrl2 || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imagePreviewUrl2 && <Typography variant="h4">+</Typography>}
                {imagePreviewUrl2 && (
                  <IconButton
                    onClick={() =>
                      handleRemoveImage(setImageFile2, setImagePreviewUrl2)
                    }
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "white",
                    }}
                  >
                    {/* <CloseIcon /> */}x
                  </IconButton>
                )}
                <input
                  type="file"
                  id="imageUpload2"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    handleImageChange(e, setImageFile2, setImagePreviewUrl2)
                  }
                />
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Original Price"
              variant="outlined"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
          </Box>
        )}
        {currentTab === 1 && (
          <Box>
            <Typography variant="h6">Materials:</Typography>
            <ul style={{ padding: 0, listStyleType: "none" }}>
              {newMaterials.map((material, index) => (
                <li
                  key={index}
                  style={{ display: "flex", gap: 10, marginBottom: "10px" }}
                >
                  <TextField
                    fullWidth
                    label="Material Name"
                    value={material.name}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Material Value"
                    value={material.value}
                    variant="outlined"
                  />
                </li>
              ))}
              <li style={{ display: "flex", gap: 10, marginBottom: "10px" }}>
                <TextField
                  fullWidth
                  label="Material Name"
                  variant="outlined"
                  value={newMaterialName}
                  onChange={(e) => setNewMaterialName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Material Value"
                  variant="outlined"
                  value={newMaterialValue}
                  onChange={(e) => setNewMaterialValue(e.target.value)}
                />
                <Button
                  onClick={handleAddMaterial}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </li>
            </ul>
          </Box>
        )}

        {currentTab === 2 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <Typography variant="h6">Sizes:</Typography>
            <ul style={{ padding: 0, listStyleType: "none" }}>
              {newSizes.map((size, index) => (
                <li
                  key={index}
                  style={{ display: "flex", gap: 10, marginBottom: "10px" }}
                >
                  <TextField
                    fullWidth
                    label="Size Name"
                    value={sizes.find((s) => s.id === size.id)?.name || ""}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    value={size.price}
                    variant="outlined"
                  />
                </li>
              ))}
              <li style={{ display: "flex", gap: 10, marginBottom: "10px" }}>
                <Select
                  value={selectedSize}
                  onChange={handleSizeChange}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "10px" }}
                >
                  {sizes.map((sz) => (
                    <MenuItem key={sz.id} value={sz.id}>
                      {sz.name}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={newSizePrice}
                  onChange={(e) => setNewSizePrice(e.target.value)}
                />
                <Button
                  onClick={handleAddSize}
                  variant="contained"
                  color="secondary"
                >
                  Add
                </Button>
              </li>
            </ul>
          </Box>
        )}
        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            style={{ marginRight: "10px" }}
          >
            Add Product
          </Button>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
