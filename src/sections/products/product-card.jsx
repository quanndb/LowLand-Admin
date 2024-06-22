// import PropTypes from "prop-types";
import {Box, Link, Card, Stack, Typography} from "@mui/material";
import { fCurrency } from "src/utils/format-number";

export default function ShopProductCard({product, onClick }) {
  return (
    <>
        <Card key={product.id} onClick={() => onClick(product)}>
          <Box sx={{ pt: "100%", position: "relative" }}>
            {/* {product.isSale && (
              <Label
                variant="filled"
                color="error"
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: "absolute",
                  textTransform: "uppercase",
                }}
              >
                Sale
              </Label>
            )} */}
            <Box
              component="img"
              alt={product.name}
              src={product.images[0].imageUrl}
              sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: "cover",
                position: "absolute",
              }}
            />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
              {product.name}
            </Link>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {product.isSale && fCurrency(product.salePrices)}
                </Typography>
                &nbsp;
                {fCurrency(product.originalPrices)}
              </Typography>
            </Stack>
          </Stack>
        </Card>
    </>
  );
}

