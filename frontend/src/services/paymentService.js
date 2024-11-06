import axios from "axios";

export const createPaymentSession = async (paymentData) => {
  try {
    const response = await axios.post(`http://localhost:5000/create-payment-session`, paymentData);
    
    if (response.data.success) {
      return { success: true, paymentUrl: response.data.paymentUrl };
    } else {
      throw new Error("Failed to create payment session");
    }
  } catch (error) {
    console.error("Error here creating payment session:", error);
    return { success: false, message: error.message };
  }
};
