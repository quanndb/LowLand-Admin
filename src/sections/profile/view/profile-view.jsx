import  { useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Breadcrumbs,
  Link,
  Box,
  Card,
  IconButton,
  Stack,
} from "@mui/material";

import DetailsTab from "./detailsTab";
import EditTab from "./editTab";
import ChangePasswordTab from "./changePassword";

const user = {
  displayName: "Nguyễn Anh Quân",
  role: "ADMIN",
  imageUrl: "https://via.placeholder.com/150",
  fullName: "Alec M. Thompson",
  phoneNumber: "(44) 123 1234 123",
  email: "alecthompson@mail.com",
  address: "Việt Nam",
  bio: "Hi, I'm Alec Thompson. Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
};

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Container>
      <Box sx={{ marginBottom: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/admin/dashboard">
            Home
          </Link>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Box>

      <Card sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            height: "300px",
            borderRadius: "8px",
            backgroundSize: "contain",
            background:
              "linear-gradient(195deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)) 50% center / cover, url(/static/images/bg_profile.jpeg)",
            backgroundPosition: "50% center",
            overflow: "hidden",
          }}
        />
        <Box
          sx={{
            mt: -8,
            ml: 3,
            mr: 3,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            p: 1,
          }}
        >
          <Avatar
            src={user.imageUrl}
            alt={user.displayName}
            sx={{ width: 80, height: 80 }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5">{user.displayName}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.role}
            </Typography>
          </Box>

          <Box sx={{ ml: "auto" }}>
            <Stack direction="row" spacing={1} sx={{md:{}}}>
              <IconButton
                sx={{ borderRadius: "4px" }}
                color={activeTab === "details" ? "primary" : "inherit"}
                aria-label="details"
                onClick={() => setActiveTab("details")}
              >
                Details
              </IconButton>
              <IconButton
                sx={{ borderRadius: "4px" }}
                color={activeTab === "edit" ? "primary" : "inherit"}
                aria-label="edit"
                onClick={() => setActiveTab("edit")}
              >
                Edit
              </IconButton>
              <IconButton
                sx={{ borderRadius: "4px" }}
                color={activeTab === "changePassword" ? "primary" : "inherit"}
                aria-label="password"
                onClick={() => setActiveTab("changePassword")}
              >
                Change Password
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Card>
      
      {activeTab === "details" && (
        <DetailsTab user={user} />
      )}
      {activeTab ==="edit" && (
      <EditTab user={user}></EditTab>
      )}
      {activeTab ==="changePassword" && (
      <ChangePasswordTab user={user}></ChangePasswordTab>
      )}
    </Container>
  );
}
