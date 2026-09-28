import Razorpay from "razorpay";

export const getRazorpayInstance = () => {
  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    "rzp_test_PeepalKratMewat";
  const keySecret =
    process.env.RAZORPAY_KEY_SECRET ||
    "rzp_test_PeepalKratMewatSecret2026";

  if (!keyId || !keySecret) {
    return null;
  }

  try {
    return new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (error) {
    console.warn("Could not instantiate official Razorpay client:", error);
    return null;
  }
};
