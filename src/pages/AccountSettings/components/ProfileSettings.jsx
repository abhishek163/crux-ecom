import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "../../../api";
import { useAuth } from "../../../context/auth";
import { FormInput } from "../../components/FormInput/FormInput";
import { FormNamesInput } from "../../components/FormInput/FormNamesInput";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export function ProfileSetting() {
  const [loading, setLoading] = useState("idle");
  const [updateStatus, setUpdateStatus] = useState("idle");
  const [error, setError] = useState("");

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const NameInputValues = [
    {
      id: 0,
      name: "firstName",
      label: "First name",
      value: formValues.firstName,
      type: "text",
      pattern: "^[A-Za-z0-9]{1,}$",
      required: true,
    },
    {
      id: 1,
      name: "lastName",
      label: "Last name",
      value: formValues.lastName,
      type: "text",
      pattern: "^[A-Za-z0-9]{1,}$",
      required: true,
    },
  ];

  const otherInputValues = [
    {
      id: 2,
      name: "email",
      label: "Email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      value: formValues.email,
      required: true,
    },
    {
      id: 3,
      name: "username",
      label: "Username",
      type: "text",
      value: formValues.username,
      pattern: "^[A-Za-z0-9]{3,16}$",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      required: true,
    },
  ];

  const {
    authDispatch,
    authState: { userID, token, userData },
  } = useAuth();

  useEffect(() => {
    setLoading("pending");
    if (userID && userData) {
      setFormValues((values) => ({
        ...values,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
      }));
      setLoading("fulfilled");
    }
  }, [userID, token, userData]);

  async function updateUserProfile(event) {
    event.preventDefault();
    setUpdateStatus("pending");
    const response = await updateProfile(
      userID,
      token,
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.username
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
      authDispatch({ type: "UPDATE_PROFILE_DATA", payload: response });
      toast.success("profile updated", {
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
    <div className="setting__profile">
      {loading === "pending" && (
        <LoadingSpinner isDefaultCss={true} size={30} />
      )}
      {loading === "fulfilled" && (
        <form className="profile-change__form" onSubmit={updateUserProfile}>
          <div className="sign-up__name">
            {NameInputValues.map((value) => {
              return (
                <FormNamesInput
                  key={value.id}
                  type={value.type}
                  required={value.required}
                  label={value.label}
                  pattern={value.pattern}
                  onChangeInput={onChangeInput}
                  {...value}
                />
              );
            })}
          </div>

          {otherInputValues.map((value) => {
            return (
              <FormInput
                key={value.id}
                name={value.name}
                type={value.type}
                required={value.required}
                label={value.label}
                onChangeInput={onChangeInput}
                pattern={value.pattern}
                value={value.value}
                {...value}
              />
            );
          })}

          <button type="submit" className="account__action-btn">
            Save
            {updateStatus === "pending" && (
              <span className="loading-indicator__spin">
                <LoadingSpinner
                  isDefaultCss={false}
                  color={"#fffff"}
                  size={13}
                />
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
