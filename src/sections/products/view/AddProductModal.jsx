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

import { materials } from "src/_mock/materials";
import { sizes } from "src/_mock/sizes";

const AddProductModal = ({ open, onClose, onAddProduct }) => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [newMaterialValue, setNewMaterialValue] = useState("");
  const [newMaterials, setNewMaterials] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");
  const [newSizes] = useState([]);
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState("");
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState("");
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null);

  const handleAddProduct = () => {
    const newProduct = {
      name: newProductName,
      originalPrices: newProductPrice,
      description: newDescription,
      materials: newMaterials,
      sizes: newSizes,
      images: [imagePreviewUrl1, imagePreviewUrl2].filter(Boolean),
    };

    onAddProduct(newProduct);

    // Clear input fields and close the modal
    setNewProductName("");
    setNewProductPrice("");
    setNewDescription("");
    setNewMaterials([]);
    setSelectedMaterial("");
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
    if (selectedMaterial && newMaterialValue.trim()) {
      // Find the selected material object
      const selectedMaterialObject = materials.find(
        (material) => material.materialName === selectedMaterial
      );

      if (selectedMaterialObject) {
        const newMaterial = {
          materialName: selectedMaterialObject.materialName,
          quantity: newMaterialValue,
          unit: selectedMaterialObject.unit,
        };
        setNewMaterials([...newMaterials, newMaterial]);
        setNewMaterialValue("");
      }
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

  const handleRemoveImage = (index) => {
    setImageToDeleteIndex(index); 
    setDeleteConfirmDialogOpen(true); 
  };

  const handleConfirmDelete = () => {
    if (imageToDeleteIndex !== null) {
      if (imageToDeleteIndex === 0) {
        setImagePreviewUrl1("");
        setImageFile1(null);
      } else if (imageToDeleteIndex === 1) {
        setImagePreviewUrl2("");
        setImageFile2(null);
      }
      setImageToDeleteIndex(null);
      setDeleteConfirmDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmDialogOpen(false);
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
                onClick={() => imagePreviewUrl1 === "" && document.getElementById("imageUpload1").click()}
                sx={{
                  width: "48%",
                  height: 200,
                  border: "2px dashed grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  cursor: imagePreviewUrl1 === "" ? "pointer" : "default",
                  backgroundImage: `url(${imagePreviewUrl1 || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imagePreviewUrl1 && <Typography variant="h4">+</Typography>}
                {imagePreviewUrl1 && (
                  <IconButton
                    onClick={() => handleRemoveImage(0)}
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: -12,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#dfdfdf",
                      "&:hover": {
                        backgroundColor: "#dfdfdf",
                        opacity: 0.7,
                      },
                    }}
                  >
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
                onClick={() => imagePreviewUrl2 === "" && document.getElementById("imageUpload2").click()}
                sx={{
                  width: "48%",
                  height: 200,
                  border: "2px dashed grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  cursor: imagePreviewUrl2 === "" ? "pointer" : "default",
                  backgroundImage: `url(${imagePreviewUrl2 || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imagePreviewUrl2 && <Typography variant="h4">+</Typography>}
                {imagePreviewUrl2 && (
                  <IconButton
                    onClick={() => handleRemoveImage(1)}
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: -12,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#dfdfdf",
                      "&:hover": {
                        backgroundColor: "#dfdfdf",
                        opacity: 0.7,
                      },
                    }}
                  >
                    x
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
            <Dialog
              open={deleteConfirmDialogOpen}
              onClose={handleCancelDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Are you sure you want to delete this image?
                </Typography>
              </DialogContent>
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button onClick={handleCancelDelete} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                  Delete
                </Button>
              </Box>
            </Dialog>
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
                  variant="outlined"
                  disabled
                  value={material.materialName}
                  ></TextField>
                  <TextField
                    fullWidth
                    label="Quantity"
                    value={material.quantity}
                    variant="outlined"
                    onChange={(e) => {
                      const updatedMaterials = [...newMaterials];
                      updatedMaterials[index].quantity = e.target.value;
                      setNewMaterials(updatedMaterials);
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Unit"
                    value={material.unit}
                    variant="outlined"
                    disabled
                  />
                </li>
              ))}
              <li style={{ display: "flex", gap: 10, marginBottom: "10px" }}>
                <Select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {materials.map((material) => (
                    <MenuItem key={material.materialId} value={material.materialName}>
                      {material.materialName}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  fullWidth
                  label="Quantity"
                  variant="outlined"
                  value={newMaterialValue}
                  onChange={(e) => setNewMaterialValue(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Unit"
                  variant="outlined"
                  value={
                    materials.find((material) => material.materialName === selectedMaterial)?.unit || ""
                  }
                  disabled
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
                  value={sizes.find((size) => size.id === selectedSize)?.price || ""}
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
