/* eslint-disable */
import axios from "axios";

var alertUs = document.querySelector(".sign-error");

export const login = async (login, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        login,
        password,
      },
    });
    if (res.data.status === "Success") {
      alertUs.style.background = "#4743c9";
      alertUs.textContent = `Welcome Back ${res.data.data.user.login}`;
      alertUs.style.display = "flex";
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1000);
    }
  } catch (err) {
    alertUs.style.display = "flex";
    alertUs.style.background = "red";
    alertUs.textContent = err.response.data.message;
    window.setTimeout(() => {
      alertUs.style.display = "none";
    }, 5000);
  }
};

// For logging  out users
export const logOut = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logOut",
    });
    if (res.data.status === "Success") {
      location.reload(true);
      location.assign("/");
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};
