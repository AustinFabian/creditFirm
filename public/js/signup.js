/* eslint-disable */
import axios from "axios";

var alertUs = document.querySelector(".sign-error");

export const signup = async (login, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        login,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "Success") {
      alertUs.style.background = "#4743c9";
      alertUs.textContent = 'Signup Successful';
      alertUs.style.display = "flex";
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1000);
    }
  } catch (err) {
    var msg = err.response.data.message;
    if (msg.includes("email_1 dup key")) {
      alertUs.textContent = "This Email is already used";
    } else if (msg.includes("passwords are not the same")) {
      alertUs.textContent = "Passwords do not match";
    } else if (msg.includes("is shorter than the minimum allowed length")) {
      alertUs.textContent = "Password is too short, less than 5 characters";
    }else{
      alertUs.textContent = err.response.data.message;
    }
    alertUs.style.background = "red";
    alertUs.style.display = "flex";

    window.setTimeout(() => {
      alertUs.style.display = "none";
    }, 5000);
  }
};
