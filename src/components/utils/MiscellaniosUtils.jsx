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
