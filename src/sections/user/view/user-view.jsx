import { useState } from "react";
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  Tab,
  Tabs,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { accounts } from "src/_mock/accounts";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tabValue, setTabValue] = useState(0);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    role: "",
  });

  const [editUser, setEditUser] = useState({
    id: null,
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    role: "",
  });

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredAccounts.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (user) => {
    setEditUser(user);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (user) => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    // setDeleteUser(null);
    setOpenDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditUser({
      id: null,
      full_name: "",
      email: "",
      phone_number: "",
      gender: "",
      address: "",
      role: "",
    });
  };

  const handleChangeNewUser = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleChangeEditUser = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleSubmitNewUser = () => {
    setOpenAddModal(false);
  };

  const handleSubmitEditUser = () => {
    setOpenEditModal(false);
  };

  const handleSubmitDeleteUser = () => {
    setOpenDeleteModal(false);
  };
  const getFilteredAccountsByRole = (role) => {
    return accounts.filter((account) => account.role === role);
  };

  const role = tabValue === 0 ? "ADMIN" : tabValue === 1 ? "EMPLOYEE" : "USER";
  const filteredAccounts = getFilteredAccountsByRole(role);

  const dataFiltered = applyFilter({
    inputData: filteredAccounts,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="ADMIN" />
            <Tab label="EMPLOYEE" />
            <Tab label="USER" />
          </Tabs>
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddModal}
        >
          NEW {role}
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={filteredAccounts.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "avatarUrl", label: "Avatar" },
                  { id: "email", label: "Email" },
                  { id: "full_name", label: "Full Name" },
                  { id: "role", label: "Role" },
                  { id: "gender", label: "Gender" },
                  { id: "phone_number", label: "Phone Number" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      email={row.email}
                      full_name={row.full_name}
                      role={row.role}
                      gender={row.gender === 0 ? "MALE" : "FEMALE"}
                      phone_number={row.phone_number}
                      avatarUrl={row.imageUrl}
                      selected={selected.indexOf(row.email) !== -1}
                      handleClick={(event) => handleClick(event, row.email)}
                      handleEdit={() => handleOpenEditModal(row)}
                      handleDelete={() => handleOpenDeleteModal(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    filteredAccounts.length
                  )}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={filteredAccounts.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Add User Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>New {role}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="full_name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.full_name}
            onChange={handleChangeNewUser}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={handleChangeNewUser}
          />
          <TextField
            margin="dense"
            name="phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.phone_number}
            onChange={handleChangeNewUser}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.gender}
            onChange={handleChangeNewUser}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.address}
            onChange={handleChangeNewUser}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleSubmitNewUser} color="primary">
            Add {role}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add User Modal End */}

      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit {role}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="full_name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser.full_name}
            onChange={handleChangeEditUser}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editUser.email}
            onChange={handleChangeEditUser}
            disabled
          />
          <TextField
            margin="dense"
            name="phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser.phone_number}
            onChange={handleChangeEditUser}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser.gender === 1 ? "FEMALE" : "MALE"}
            onChange={handleChangeEditUser}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser.address}
            onChange={handleChangeEditUser}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSubmitEditUser} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit User Modal End */}

      {/* Delete User Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete {role}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleSubmitDeleteUser} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
