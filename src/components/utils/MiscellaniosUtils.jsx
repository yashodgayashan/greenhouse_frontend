import Spinner from "react-bootstrap/Spinner";
import { FaFilter } from "react-icons/fa";
import { Clear, Save } from "@material-ui/icons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { FILTER, INTERNAL_SERVER_ERROR, SAVE } from "../../constants";

const MySwal = withReactContent(Swal);

export function showFilterSpinner(btnText) {
  if (btnText === FILTER) {
    return (
      <span>
        <FaFilter /> {btnText}
      </span>
    );
  } else {
    return (
      <span>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        {btnText}
      </span>
    );
  }
}

export function showSaveSpinner(btnText) {
  if (btnText === SAVE) {
    return (
      <span>
        <Save /> {btnText}
      </span>
    );
  } else {
    return (
      <span>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        {btnText}
      </span>
    );
  }
}

export function alertError(msg) {
  MySwal.fire("Something Went Wrong!", msg, "error");
}

export function deleteMessage(msg, apiCall, id) {
  MySwal.fire({
    title: msg,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(result => {
    if (result.value) {
      apiCall(id);
    }
  });
}

export function createIsDeleteMsg(type, id) {
  return "You want to Delete " + type + " with ID " + id + "?";
}

export function deleteMsgPopUp(message) {
  MySwal.fire("Deleted!", message, "success");
}

export function createDeleteMsg(type, id) {
  return type + " " + id + "  has been deleted.";
}

export function handleErr(error) {
  let err = INTERNAL_SERVER_ERROR;
  if (error.response) {
    err = error.response.data;
  }
  alertError(err);
}

export function handleError(error) {
  let err = INTERNAL_SERVER_ERROR;
  if (error.response) {
    err = error.response.data;
    if (typeof err !== "string") {
      console.log(err);

      let errMsg = err.error + " (" + err.message + ")";
      if (err.trace) {
        let ks = err.trace.split("\n");
        errMsg += "\n" + ks[0];
      }
      err = errMsg;
    }
  }
  alertError(err);
}

export function constructLocationArray(locations) {
  let locationArray = [];
  locations.forEach(location => {
    let element = { value: location.id, label: location.name };
    locationArray.push(element);
  });
  return locationArray;
}
