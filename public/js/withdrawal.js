/* eslint-disable */
import axios from "axios";

export const withdraw = async (transactionId, address,payment,amount,img,date) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/withdrawals",
      data: {
        transactionId,
        address,
        payment,
        amount,
        img,
        date
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err)
  }
};

// DELETING WthdrawTransaction ENGINE
export const deleteWithdraw = async (Id) => {

  const url = `/api/v1/withdrawals/${Id}`;

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
