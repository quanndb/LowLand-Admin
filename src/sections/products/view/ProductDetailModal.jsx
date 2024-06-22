import { useState, useEffect } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { sizes } from "src/_mock/sizes";

const ProductDetailModal = ({ product, open, onClose }) => {
  if (!product) return null;

  const { images, name, originalPrices, materials, size, description } =
    product;

  const [editedName, setEditedName] = useState(name);
  const [editedOriginalPrices, setEditedOriginalPrices] =
    useState(originalPrices);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedMaterials, setEditedMaterials] = useState(materials || []);
  const [currentTab, setCurrentTab] = useState(0);
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialValue, setNewMaterialValue] = useState("");
  const [selectedSize, setSelectedSize] = useState(
    size.length > 0 ? size[0] : null
  );
  const [editedSizes, setEditedSizes] = useState(size);

  const [newSizeName, setNewSizeName] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");

  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState(
    images[0].imageUrl || ""
  );
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState(
    images[1].imageUrl || ""
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null);

  useEffect(() => {
    setEditedName(name);
    setEditedOriginalPrices(originalPrices);
    setEditedDescription(description);
    setEditedMaterials(materials || []);
    setEditedSizes(size);
    setSelectedSize(size.length > 0 ? size[0] : null);
    setImagePreviewUrl1(images[0].imageUrl || "");
    setImagePreviewUrl2(images[1].imageUrl || "");
  }, [product]);

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleOriginalPricesChange = (event) => {
    setEditedOriginalPrices(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    };
    setEditedMaterials(updatedMaterials);
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials.splice(index, 1);
    setEditedMaterials(updatedMaterials);
  };

  const handleAddMaterial = () => {
    if (newMaterialName.trim() && newMaterialValue.trim()) {
      const newMaterial = {
        name: newMaterialName,
        value: newMaterialValue,
      };
      setEditedMaterials([...editedMaterials, newMaterial]);
      setNewMaterialName("");
      setNewMaterialValue("");
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSizeChange = (event) => {
    const newSizeId = event.target.value;
    const newSize = sizes.find((sz) => sz.id === newSizeId);
    setSelectedSize(newSize || null);
  };

  const handleAddSize = () => {
    if (newSizeName.trim() && newSizePrice.trim()) {
      const newId =
        editedSizes.length > 0 ? editedSizes[editedSizes.length - 1].id + 1 : 1;
      const newSize = {
        id: newId,
        name: newSizeName,
        price: parseFloat(newSizePrice),
      };
      const newSizes = [...editedSizes, newSize];
      setEditedSizes(newSizes);
      setNewSizeName("");
      setNewSizePrice("");
    }
  };

  const handleDeleteSize = (index) => {
    const updatedSizes = [...editedSizes];
    updatedSizes.splice(index, 1);
    setEditedSizes(updatedSizes);
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

  const handleSizeNameChange = (index, newName) => {
    const updatedSizes = [...editedSizes];
    updatedSizes[index] = { ...updatedSizes[index], name: newName };
    setEditedSizes(updatedSizes);
  };

  const handleSizePriceChange = (index, newPrice) => {
    const updatedSizes = [...editedSizes];
    updatedSizes[index] = { ...updatedSizes[index], price: newPrice };
    setEditedSizes(updatedSizes);
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
    setImageToDeleteIndex(index); // Set the index of the image to delete
    setDeleteConfirmDialogOpen(true); // Open the delete confirmation dialog
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ overflowY: "auto", overflowX: "hidden" }}
    >
      <DialogContent
        sx={{
          width: 600,
          height: 700,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogTitle>Edit Product</DialogTitle>

        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Product Details Tabs"
        >
          <Tab label="Details" />
          <Tab label="Materials" />
          <Tab label="Sizes" />
        </Tabs>

        {currentTab === 0 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <DialogTitle>{name}</DialogTitle>

            <Box
              display="flex"
              justifyContent="space-between"
              gap={2}
              sx={{ m: 1 }}
            >
              <Box
                onClick={() =>
                  imagePreviewUrl1 === "" &&
                  document.getElementById("imageUpload1").click()
                }
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
                onClick={() =>
                  imagePreviewUrl2 === "" &&
                  document.getElementById("imageUpload2").click()
                }
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

            <TextField
              label="Product Name"
              value={editedName}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Original Prices"
              type="number"
              value={editedOriginalPrices}
              onChange={handleOriginalPricesChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Description"
              value={editedDescription}
              onChange={handleDescriptionChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
        )}

        {currentTab === 1 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <Box sx={{ m: 2 }}>
              {editedMaterials.map((material, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  <TextField
                    label="Material Name"
                    value={material.name}
                    onChange={(e) =>
                      handleMaterialChange(index, "name", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Material Value"
                    value={material.value}
                    onChange={(e) =>
                      handleMaterialChange(index, "value", e.target.value)
                    }
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteMaterial(index)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}

              <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                  label="New Material Name"
                  value={newMaterialName}
                  onChange={(e) => setNewMaterialName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="New Material Value"
                  value={newMaterialValue}
                  onChange={(e) => setNewMaterialValue(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMaterial}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {currentTab === 2 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <Box sx={{ m: 2 }}>
              <Select
                label="Size"
                value={selectedSize ? selectedSize.id : ""}
                onChange={handleSizeChange}
                fullWidth
              >
                {sizes.map((sz) => (
                  <MenuItem key={sz.id} value={sz.id}>
                    {sz.name}
                  </MenuItem>
                ))}
              </Select>
              {selectedSize && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Selected Size:</Typography>
                  <Typography>Name: {selectedSize.name}</Typography>
                  <Typography>Price: {selectedSize.price}</Typography>
                </Box>
              )}

              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6">Sizes:</Typography>
                {editedSizes.map((sz, index) => (
                  <Box
                    key={sz.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      marginBottom: 2,
                    }}
                  >
                    <TextField
                      label="Size Name"
                      value={sz.name}
                      onChange={(e) =>
                        handleSizeNameChange(index, e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Size Price"
                      value={sz.price}
                      onChange={(e) =>
                        handleSizePriceChange(index, e.target.value)
                      }
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteSize(index)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
                <TextField
                  label="New Size Name"
                  value={newSizeName}
                  onChange={(e) => setNewSizeName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="New Size Price"
                  value={newSizePrice}
                  onChange={(e) => setNewSizePrice(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSize}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Box>
      </DialogContent>

      <Dialog open={deleteConfirmDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this image?</Typography>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelDelete}
              sx={{ mr: 1 }}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmDelete}
            >
              Yes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default ProductDetailModal;
