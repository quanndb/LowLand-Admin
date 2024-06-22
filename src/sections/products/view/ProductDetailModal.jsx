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
} from "@mui/material";
import { sizes } from "src/_mock/sizes";

const ProductDetailModal = ({ product, open, onClose }) => {
  if (!product) return null;

  const {
    images,
    name,
    originalPrices,
    materials,
    size,
    description,
  } = product;

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

  useEffect(() => {
    setEditedName(name);
    setEditedOriginalPrices(originalPrices);
    setEditedDescription(description);
    setEditedMaterials(materials || []);
    setEditedSizes(size);
    setSelectedSize(size.length > 0 ? size[0] : null);
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

  const handleSaveChanges = () => {
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

            <img
              src={images[0].imageUrl}
              alt={name}
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <img
              src={images[1].imageUrl}
              alt={name}
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={editedName}
              onChange={handleNameChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Original Price"
              variant="outlined"
              value={editedOriginalPrices}
              onChange={handleOriginalPricesChange}
              style={{ marginBottom: "10px" }}
            />

            {/* <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={editedSalePrices}
              onChange={handleSalePricesChange}
              style={{ marginBottom: "10px" }}
            /> */}

            <textarea
              rows={4}
              label="Description"
              variant="outlined"
              value={editedDescription}
              onChange={handleDescriptionChange}
              style={{ marginBottom: "10px", width: "100%" }}
            />
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
      </DialogContent>
      <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end", mb:"10px" , mr:"20px"}}>
        <Button onClick={onClose} style={{ marginRight: "10px" }}>
          Close
        </Button>
        <Button onClick={handleSaveChanges} variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Dialog>
  );
};

export default ProductDetailModal;
