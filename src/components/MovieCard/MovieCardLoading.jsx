import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const CardContentNoPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 8px;
  }
`);

export default function MovieCardLoading() {
  return (
      <Card sx={{ border: 1, color: "primary.main" }}>
        <Skeleton animation="wave" variant="recangular" sx={{ height: 200 }} />
        <CardContentNoPadding sx={{ pt: 1, px: 1.5 }}>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{ height: 50, cursor: "pointer", color: "white" }}
          >
            <Skeleton animation="wave" />
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <Skeleton animation="wave" sx={{width: 40}}/>
            </Typography>
            <IconButton aria-label="fav" sx={{ p: 0 }} disabled>
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </CardContentNoPadding>
      </Card>
  );
}
