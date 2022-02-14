import { useState } from "react";
import { useAuth } from "../../../context/auth";
import { FormInput } from "../../components/FormInput/FormInput";
import { updatePassword } from "../../../api";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";

export function PasswordSetting() {
  const [updateStatus, setUpdateStatus] = useState("idle");
  const [error, setError] = useState("");
  const {
    authState: { userID, token },
  } = useAuth();

  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const passwordInputValues = [
    {
      id: 1,
      name: "currentPassword",
      label: "Current password",
      type: "password",
      placeholder: "***********",
      required: true,
    },
    {
      id: 2,
      name: "newPassword",
      label: "New password",
      type: "password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      placeholder: "***********",
      required: true,
    },
  ];

  async function updateUserPassword(e) {
    e.preventDefault();
    setUpdateStatus("pending");
    const response = await updatePassword(
      userID,
      token,
      formValues.currentPassword,
      formValues.newPassword
    );
    if (response.errMessage) {
      setUpdateStatus("rejected");
      setError(response.errMessage);
      toast.error(`${response.errMessage}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
    } else {
      setUpdateStatus("fulfilled");
      toast.success("successfully password changed", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
    }
  }

  function onChangeInput(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  return (
    <div className="setting__password">
      <form className="password-change__form" onSubmit={updateUserPassword}>
        {passwordInputValues.map((value) => {
          return (
            <FormInput
              key={value.id}
              name={value.name}
              type={value.type}
              required={value.required}
              label={value.label}
              onChangeInput={onChangeInput}
              pattern={value.pattern}
              isErrorMessageVisible={true}
              {...value}
            />
          );
        })}

        <button type="submit" className="account__action-btn">
          changing password
          {updateStatus === "pending" && (
            <span className="loading-indicator__spin">
              <LoadingSpinner isDefaultCss={false} color={"#fffff"} size={13} />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
