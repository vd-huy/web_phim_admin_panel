import { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { color } from "chart.js/helpers";
import zIndex from "@mui/material/styles/zIndex";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  color: "#000",
  boxShadow: 24,
  p: 4,
  zIndex: 100,
};

const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

const ModalDelete = ({ title, id, show, onRequestClose }) => {

  const handleDelete = async () => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/api/admin/${title}/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        enqueueSnackbar("Delete is successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });

      onRequestClose();
  };

  return (
    <Modal
      open={show}
      onClose={onRequestClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          align="center"
        >
          Confirm Delete
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} align="center">
          Are you sure you want to delete this {title}?
        </Typography>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ color: "#ddeaf5" }}
            onClick={onRequestClose}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
