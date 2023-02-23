import axios from "axios";
const alert = document.querySelector(".alert-danger");

export const notifyClient = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/notifications",
      data,
    });

    if (res.data.status === "success") {
      alert.textContent = "Notification Sent";
      alert.style.background = "rgba(32, 191, 107, .5)";
      alert.style.display = "flex";
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    var msg = err.response.data.message;
    alert.textContent = msg;
    alert.style.background = "rgba(255, 0, 0, .5)"
    alert.style.display = "flex";
    window.setTimeout(() => {
      alert.style.display = "none";
    }, 5000);
  }
};

// DELETING NOTIFICATION ENGINE
export const deleteNotification = async (Id) => {

    const url = `/api/v1/notifications/${Id}`;
  
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