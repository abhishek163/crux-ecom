export function loadRazorPay() {

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
  
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  }


  export const addressValues = [
    {
      id: 1,
      name: "mobile",
      type: "text",
      htmlFor: "mobile",
      label: "Mobile number",
      pattern: "^[0-9]{1,10}$",
      required: true,
      placeholder: "Enter Your Mobile Number  - 99XXXXXXXX",
      errorMessage: "Mobile number is invalid",
    },
    {
      id: 2,
      name: "pincode",
      type: "text",
      htmlFor: "pincode",
      label: "Pincode",
      pattern: "^[A-Za-z0-9]{1,10}$",
      required: true,
      placeholder: "Enter your Pincode - 324xxx",
    },
    {
      id: 3,
      name: "house_no",
      type: "text",
      htmlFor: "house_no",
      label: "House No ,Flat , Building , Company , Apartment",
      pattern: "^[A-Za-z0-9]{1,}$",
      required: true,
      placeholder: "Enter your house , flat no  . . . ",
    },
    {
      id: 4,
      name: "area",
      type: "text",
      htmlFor: "Landmark , Area , Village",
      label: "Landmark , Area , Village",
      pattern: "^[A-Za-z0-9]{1,}$",
      required: true,
      placeholder: "Enter landmark ",
    },
    {
      id: 5,
      name: "city",
      type: "text",
      htmlFor: "City",
      label: "City",
      pattern: "^[A-Za-z0-9]{1,}$",
      required: true,
      placeholder: "Delhi  Mumbai  Bangalore . . .",
    },
  ];