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

  const { images, name, originalPrices, materials, size, description } = product;

  const [editedName, setEditedName] = useState(name);
  const [editedOriginalPrices, setEditedOriginalPrices] = useState(originalPrices);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedMaterials, setEditedMaterials] = useState(materials || []);
  const [currentTab, setCurrentTab] = useState(0);
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialValue, setNewMaterialValue] = useState("");
  const [selectedSize, setSelectedSize] = useState(size.length > 0 ? size[0] : null);
  const [editedSizes, setEditedSizes] = useState(size);

  const [newSizeName, setNewSizeName] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");

  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState(images[0].imageUrl || "");
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState(images[1].imageUrl || "");

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
    if (selectedSize && selectedSize.id === editedSizes[index].id) {
      setSelectedSize(updatedSizes.length > 0 ? updatedSizes[0] : null);
    }
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

  const handleRemoveImage = (setImageFile, setImagePreviewUrl) => {
    setImageFile(null);
    setImagePreviewUrl("");
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

            <Box sx={{ p: 1 }}>
              <TextField
                fullWidth
                label="Name"
                value={editedName}
                onChange={handleNameChange}
              />
            </Box>

            <Box sx={{ p: 1 }}>
              <TextField
                fullWidth
                label="Original Prices"
                value={editedOriginalPrices}
                onChange={handleOriginalPricesChange}
              />
            </Box>

            <Box sx={{ p: 1 }}>
              <TextField
                fullWidth
                label="Description"
                value={editedDescription}
                onChange={handleDescriptionChange}
                multiline
                rows={4}
              />
            </Box>
          </Box>
        )}
         {currentTab === 1 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden"}}>
            <Typography variant="h6">Materials:</Typography>
            <ul style={{ padding: 0, listStyleType: "none" }}>
              {materials.map((material, index) => (
                <li
                  key={index}
                  style={{ display: "flex", gap: 1, marginBottom: "5px" }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    value={material.materialName || ""}
                    variant="outlined"
                    onChange={(e) =>
                      handleMaterialChange(index, "materialName", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Quantity"
                    value={material.quantity || ""}
                    onChange={(e) =>
                      handleMaterialChange(index, "quantity", e.target.value)
                    }
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Unit"
                    value={material.unit || ""}
                    disabled
                    variant="outlined"
                  />
                  <Button
                    onClick={() => handleDeleteMaterial(index)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </li>
              ))}
              {newMaterialName && (
                <li style={{ display: "flex", gap: 1, marginBottom: "5px" }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={newMaterialName}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    fullWidth
                    label="Quantity"
                    value={newMaterialValue}
                    variant="outlined"
                    disabled
                  />
                </li>
              )}
            </ul>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Material Name"
                variant="outlined"
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
              />
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
                value={newMaterialValue}
                onChange={(e) => setNewMaterialValue(e.target.value)}
              />
              <Button
                onClick={handleAddMaterial}
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            </Box>
          </Box>
        )}
       {currentTab === 2 && (
          <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <Typography variant="h6">Sizes:</Typography>
            <Box style={{ display: "flex", gap: 1, marginBottom: "10px" }}>
              <Select
                value={selectedSize ? selectedSize.id : ""}
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

                // value={
                //   sizes.find((size) => size.sizeName === selectedSizes)?.price || ""
                // }

                onChange={(e) => setNewSizePrice(e.target.value)}
              />
              <Button
                onClick={handleAddSize}
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            </Box>
            
            <Box>
            <ul style={{ padding: 0, listStyleType: "none" }}>
              {editedSizes.map((sz, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Size Name"
                    variant="outlined"
                    value={sz.name}
                    onChange={(e) =>
                      handleSizeNameChange(index, e.target.value)
                    }
                    style={{ marginRight: "10px" }}
                  />
                  <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    value={sz.price}
                    onChange={(e) =>
                      handleSizePriceChange(index, e.target.value)
                    }
                    style={{ marginRight: "10px" }}
                  />
                  <Button
                    onClick={() => handleDeleteSize(index)}
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            </Box>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
