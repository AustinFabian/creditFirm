/* eslint-disable */
import axios from "axios";

export const sendMail = async (data,who) => {
  const url = who === "" ? `/api/v1/emails` : `/api/v1/emails/${who}`;

  console.log(url)
  try {
    const res = await axios({
      method: "POST",
      url,
      data,
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
