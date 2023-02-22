import axios from "axios";

const alert = document.querySelector(".alert-danger");
const success = document.getElementById("popSuccess");

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  const url =
    type === "password"
      ? "/api/v1/users/updateMyPassword"
      : "/api/v1/users/updateMe";

  try {
    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "Success") {
      success.style.display = "block";
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    var errMsg = err.response.data.message;
    alert.style.background = "rgba(255, 0, 0, .5)";
    alert.style.color = "white";

    if(errMsg.includes("is shorter than the minimum allowed length")){
      alert.textContent = "New Password is too short, less than 5 characters";
    }else{
      alert.textContent = errMsg;
    }
    alert.style.display = "flex";
    console.log("error", errMsg);
    window.setTimeout(() => {
      alert.style.display = "none";
    }, 5000);
  }
};

// CREATING TOUR ENGINE
export const newWallet = async (coinName, address) => {
  const url = `/api/v1/coins`;

  try {
    const res = await axios({
      method: "POST",
      url,
      data: {
        coinName,
        address,
      },
    });

    if (res.data.status === "success") {
      location.reload();
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// UPDATING TOUR ENGINE
export const updateWallet = async (address, coinId) => {
  const url = `/api/v1/coins/${coinId}`;

  try {
    const res = await axios({
      method: "PATCH",
      url,
      data: {
        address,
      },
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// Update user Engine

export const updateUserData = async (userId, data) => {
  const url = `/api/v1/users/${userId}`;

  try {
    var res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (err) {
    console.log(`error: ${err.response.data.message}`);
  }
};

// DELETE USER ENGINE
export const deleteClient = async (userId) => {

  const url = `/api/v1/users/${userId}`;

  try {
    const res = await axios({
      method: 'DELETE',
      url
    });

    if(res.data.status === 'success'){
        location.reload(true)
    }
  } catch (err) {
    console.log('error',err.response.data.message);
  }
};

// // DELETE USER ENGINE
// export const deactivateSelf = async () => {

//   const url = `/api/v1/users/deleteme`;

//   try {
//     const res = await axios({
//       method: 'DELETE',
//       url
//     });

//     if(res.status === 204){
//         location.assign('/')
//     }
//   } catch (err) {
//     console.log('error',err.response.data.message);
//   }
// };

