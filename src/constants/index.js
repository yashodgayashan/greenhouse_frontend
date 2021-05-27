export const LOCAL_API_URL = "http://localhost:9080";
export const HOST_NAME = LOCAL_API_URL;

export const FILTER = "Filter";
export const SAVE = "Save";
export const EDIT = "Edit";

export const FILTERING = "Filtering...";
export const SAVING = "Saving...";
export const EDITING = "Editing...";

export const strOptions = [
  { value: "eq", label: "Equals" },
  { value: "con", label: "Contains" }
];

export const eqOptions = [{ value: "eq", label: "Equals" }];

export const intOptions = [
  { value: "eq", label: "Equals" },
  { value: "gt", label: "Greater than" },
  { value: "gte", label: "Greater than or equal" },
  { value: "lt", label: "Less than" },
  { value: "lte", label: "Less than or equal" }
];

export const levelOptions = [
  { value: "Hight", label: "Hight" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" }
];

export const INTERNAL_SERVER_ERROR = "Internal server error!";

// Styles

export const filterLabel = {
  marginBottom: 0
};

export const dropdownCol = {
  paddingRight: 0
};

export const inputCol = {
  paddingLeft: 0,
  paddingRight: 30
};

export const filterBtn = {
  marginRight: 10,
  width: 120
};

export const resultsDescStyle = {
  fontSize: 12
};
