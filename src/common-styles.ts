export const commonStyles = {
  resetButton: {
    width: "200px",
    border: "1px lightgray solid",
    textTransform: "none",
    backgroundColor: "#f6f6f6",
    color: "black",
    borderRadius: 0,
    margin: "2px",
  },
  searchButton: {
    width: "200px",
    backgroundColor: "#265b7a",
    color: "white",
    textTransform: "none",
    borderRadius: 0,
    margin: "2px",
    "&:hover": { backgroundColor: "#265b7a" },
  },
  selectInDialogButton: {
    backgroundColor: "#f0d093",
    width: "200px",
    textTransform: "none",
    color: "white",
    border: "1px solid gray",
    borderRadius: 0,
    "&:hover": { backgroundColor: "#f0d093" },
  },
  cancelInDialogButton: {
    width: "200px",
    textTransform: "none",
    color: "black",
    border: "1px solid gray",
    marginLeft: "2px",
    borderRadius: 0,
    backgroundColor: "#f6f6f6",
  },
  tableCell: { borderLeft: "1px lightgray solid", width: "200px" },
  blueHeadline: {
    backgroundColor: "#3f9ac9",
    color: "white",
    height: "40px",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
};
