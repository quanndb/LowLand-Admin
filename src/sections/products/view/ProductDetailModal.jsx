
import { useState } from "react";
import {Box, Button, DialogTitle, DialogContent, Dialog, TextField, Typography, IconButton} from "@mui/material";


const ProductDetailModal = ({ product, open, onClose }) => {
  if (!product) return null; 
  const {
    imageURL,
    name,
    title,
    originalPrices,
    salePrices,
    detail,
    materials,
    size,
  } = product;

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedOriginalPrices, setEditedOriginalPrices] = useState(
    originalPrices
  );
  const [editedSalePrices, setEditedSalePrices] = useState(salePrices);
  const [editedDetail, setEditedDetail] = useState(detail);

  const [editedMaterials, setEditedMaterials] = useState(materials);
  const [newMaterial, setNewMaterial] = useState("");

  const [editedSize, setEditedSize] = useState(size);
  const [newSizeName, setNewSizeName] = useState("");
  const [newSizePrice, setNewSizePrice] = useState("");

  const handleImageError = (event) => {
    event.target.src = "/static/images/product2.jpg";
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleOriginalPricesChange = (event) => {
    setEditedOriginalPrices(event.target.value);
  };

  const handleSalePricesChange = (event) => {
    setEditedSalePrices(event.target.value);
  };

  const handleDetailChange = (event) => {
    setEditedDetail(event.target.value);
  };

  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials[index] = value;
    setEditedMaterials(updatedMaterials);
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim() !== "") {
      setEditedMaterials([...editedMaterials, newMaterial]);
      setNewMaterial("");
    }
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials.splice(index, 1);
    setEditedMaterials(updatedMaterials);
  };

  const handleSizeNameChange = (index, value) => {
    const updatedSize = [...editedSize];
    updatedSize[index].name = value;
    setEditedSize(updatedSize);
  };

  const handleSizePriceChange = (index, value) => {
    const updatedSize = [...editedSize];
    updatedSize[index].price = value;
    setEditedSize(updatedSize);
  };

  const handleAddSize = () => {
    if (newSizeName.trim() !== "" && newSizePrice.trim() !== "") {
      const newId = editedSize.length > 0 ? editedSize[editedSize.length - 1].id + 1 : 1;
      const newSize = {
        id: newId,
        name: newSizeName,
        price: newSizePrice,
      };
      setEditedSize([...editedSize, newSize]);
      setNewSizeName("");
      setNewSizePrice("");
    }
  };

  const handleDeleteSize = (index) => {
    const updatedSize = [...editedSize];
    updatedSize.splice(index, 1);
    setEditedSize(updatedSize);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes here if needed
    onClose(); // Close the modal after saving changes
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Box>
          <img
            src={imageURL}
            alt={name}
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              marginBottom: "10px",
            }}
            onError={handleImageError}
          />
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={editedTitle}
            onChange={handleTitleChange}
            style={{ marginBottom: "10px" }}
          />
        </Box>
        <TextField
          fullWidth
          label="Original Price"
          variant="outlined"
          value={editedOriginalPrices}
          onChange={handleOriginalPricesChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          label="Sale Price"
          variant="outlined"
          value={editedSalePrices}
          onChange={handleSalePricesChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          label="Detail"
          variant="outlined"
          multiline
          rows={4}
          value={editedDetail}
          onChange={handleDetailChange}
          style={{ marginBottom: "10px" }}
        />

        <Typography variant="h6">Materials:</Typography>
        <ul>
          {editedMaterials.map((material, index) => (
            <li key={index}>
              <TextField
                fullWidth
                value={material}
                onChange={(e) => handleMaterialChange(index, e.target.value)}
                variant="outlined"
                style={{ marginBottom: "5px" }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteMaterial(index)}
                size="small"
                style={{ marginLeft: "10px" }}
              >
                {/* <DeleteIcon /> */}
              </IconButton>
            </li>
          ))}
          <li>
            <TextField
              fullWidth
              label="New Material"
              variant="outlined"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              style={{ marginBottom: "5px" }}
            />
            <IconButton
              aria-label="add"
              onClick={handleAddMaterial}
              size="small"
              style={{ marginLeft: "10px" }}
            >
              {/* <AddIcon /> */}
            </IconButton>
          </li>
        </ul>

        <Typography variant="h6">Sizes:</Typography>
        <ul>
          {editedSize.map((s, index) => (
            <li key={s.id}>
              <TextField
                fullWidth
                label="Size Name"
                variant="outlined"
                value={s.name}
                onChange={(e) => handleSizeNameChange(index, e.target.value)}
                style={{ marginBottom: "5px" }}
              />
              <TextField
                fullWidth
                label="Size Price"
                variant="outlined"
                value={s.price}
                onChange={(e) => handleSizePriceChange(index, e.target.value)}
                style={{ marginBottom: "5px", marginLeft: "10px" }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteSize(index)}
                size="small"
                style={{ marginLeft: "10px" }}
              >
                {/* <DeleteIcon /> */}
              </IconButton>
            </li>
          ))}
          <li>
            <TextField
              fullWidth
              label="New Size Name"
              variant="outlined"
              value={newSizeName}
              onChange={(e) => setNewSizeName(e.target.value)}
              style={{ marginBottom: "5px" }}
            />
            <TextField
              fullWidth
              label="New Size Price"
              variant="outlined"
              value={newSizePrice}
              onChange={(e) => setNewSizePrice(e.target.value)}
              style={{ marginBottom: "5px", marginLeft: "10px" }}
            />
            <IconButton
              aria-label="add"
              onClick={handleAddSize}
              size="small"
              style={{ marginLeft: "10px" }}
            >
              {/* <AddIcon /> */}
            </IconButton>
          </li>
        </ul>

        <Button onClick={handleSaveChanges} variant="contained" color="primary">
          Save Changes
        </Button>
        <Button onClick={onClose} style={{ marginLeft: "10px" }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
