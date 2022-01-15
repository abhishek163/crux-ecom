import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function checkErrorAndReturnResponse(error) {
  if (error.response) {
    return { errMessage: error.response.data.message };
  } else if (error.request) {
    return { errMessage: "Network Error Please Try Again " };
  } else {
    console.log(error);
  }
  console.log(error.config);
}

// api keys for cart items

export async function getCartItems(token, userID) {
  const url = `${API_KEY}/users/${userID}/cart`;
  const headers = {
    authorization: token,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addToCart({ userID, token, productID }) {
  const url = `${API_KEY}/users/${userID}/cart`;
  const headers = {
    authorization: token,
  };

  try {
    const response = await axios.post(
      url,
      {
        productId: productID,
      },
      { headers }
    );
    return response.data.userData.cartItems;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

export async function removeCart(userID, token, cartID) {
  const url = `${API_KEY}/users/${userID}/cart/${cartID}`;

  try {
    const cartResponse = await axios.delete(url, {
      headers: {
        authorization: token,
      },
    });
    if (cartResponse.status === 204) {
      return cartResponse.data;
    }
  } catch (error) {
    console.log(error);
    return { errMessage: error.message };
  }
}

export async function increaseCartQuantity(userID, token, cartID) {
  const url = `${API_KEY}/users/${userID}/cart/${cartID}`;

  const headers = {
    authorization: token,
  };

  try {
    const cartResponse = await axios.post(
      url,
      {
        quantity: "inc",
      },
      { headers }
    );
    return cartResponse.data;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

export async function decreaseCartQuantity(userID, token, cartID) {
  const url = `${API_KEY}/users/${userID}/cart/${cartID}`;
  const headers = {
    authorization: token,
  };

  try {
    const cartResponse = await axios.post(
      url,
      {
        quantity: "dec",
      },
      { headers }
    );
    return cartResponse.data;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

// api keys for products

export async function getProductByID(productID) {
  const url = `${API_KEY}/products/${productID}`;

  try {
    const response = await axios.get(url);
    return response.data.product;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return { errMessage: error.message };
  }
}

export async function getProucts() {
  const url = `${API_KEY}/products`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error.errMessage);
    return { errMessage: error.errMessage };
  }
}

// api keys for auth and user

export async function createNewUserAccount(
  firstName,
  lastName,
  username,
  email,
  password
) {
  const url = `${API_KEY}/signup`;
  try {
    const response = await axios.post(url, {
      firstName,
      lastName,
      email,
      username,
      password,
      object: "users",
    });
    console.log(response);

    return response.data;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

export async function SignInUser(username, password) {
  const url = `${API_KEY}/login`;

  try {
    const userResponse = await axios.post(url, {
      username,
      password,
    });
    return userResponse.data;
  } catch (error) {
    const errResponse = checkErrorAndReturnResponse(error);
    return errResponse;
  }
}

export async function updateProfile(
  userID,
  token,
  firstName,
  lastName,
  email,
  username
) {
  const url = `${API_KEY}/users/${userID}/profile`;
  const headers = {
    authorization: token,
  };
  try {
    const userResponse = await axios.post(
      url,
      {
        firstName,
        lastName,
        email,
        username,
      },
      { headers }
    );
    return userResponse.data;
  } catch (error) {
    const errResponse = checkErrorAndReturnResponse(error);
    return errResponse;
  }
}

export async function updatePassword(
  userID,
  token,
  currentPassword,
  newPassword
) {
  const url = `${API_KEY}/users/${userID}/password`;
  const headers = {
    authorization: token,
  };
  try {
    const userResponse = await axios.post(
      url,
      {
        currentPassword,
        newPassword,
      },
      { headers }
    );

    return userResponse.data;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

export async function getUserData(token, userID) {
  const url = `${API_KEY}/users/${userID}`;
  const headers = {
    authorization: token,
  };
  try {
    const response = await axios.get(url, {
      headers,
    });
    return response.data;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

// api keys for wishlist

export async function removeWishListFromServer(userID, token, productID) {
  const url = `${API_KEY}/users/${userID}/wishlist`;

  try {
    const response = await axios.delete(url, {
      headers: {
        authorization: token,
      },
      data: {
        productId: productID,
      },
    });
    if (response.data.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function removeWishListItem(userID, token, productID) {
  const url = `${API_KEY}/users/${userID}/wishlist`;

  try {
    const response = await axios.delete(url, {
      headers: {
        authorization: token,
      },
      data: {
        productId: productID,
      },
    });
    if (response.status === 204) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return { errMessage: error.message };
  }
}

export async function addInWishlist(userID, token, productID) {
  const url = `${API_KEY}/users/${userID}/wishlist`;

  const headers = {
    authorization: token,
  };

  try {
    const response = await axios.post(
      url,
      {
        productId: productID,
      },
      {
        headers,
      }
    );
    return response.data.userData;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

export async function getUserWishList(userID, token) {
  const url = `${API_KEY}/users/${userID}/wishlist`;
  try {
    const headers = {
      authorization: token,
    };
    const response = await axios.get(url, { headers });
  } catch (error) {
    console.log(error);
    return { errMessage: error.message };
  }
}

// api keys for order

export async function createOrder({ order, userID, token }) {
  const url = `${API_KEY}/users/${userID}/order`;
  const headers = {
    authorization: token,
  };
  try {
    const response = await axios.post(
      url,
      {
        order,
      },
      { headers }
    );
    return response;
  } catch (error) {
    const err = checkErrorAndReturnResponse(error);
    return err;
  }
}

// api key for razorpay payment

export async function razorpayCreateOrder(amount) {
  const url = `${API_KEY}/checkout/payment`;

  try {
    const response = await axios.post(url, {
      amount: amount,
      currency: "INR",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { errMessage: error.message };
  }
}
