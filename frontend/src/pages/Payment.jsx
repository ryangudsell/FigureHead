import React, { useState } from "react";

const Payment = () => {
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const handlePaymentSubmit = () => {
    // Assume the payment is successful for this example
    setPaymentSubmitted(true);
  };

  return (
    // This is basically the body tag
    <div id="payment-page">
      {paymentSubmitted ? (
        // If payment is submitted, show success message and home button
        <div id="payment-success">
          <h2>Success! Payment is complete.</h2>
          <button onClick={() => window.location.replace("/")}>Home</button>
        </div>
      ) : (
        // If payment is not submitted, show the form
        <div id="payment-form">
          <h1>Checkout</h1>

          {/* Start of the form and we are going to flex this, it will hold all of the form items */}
          <form id="flex">
            {/* Name of the card form item */}
            <div className="payment-flex-item name-on-card">
              <label>Cardholder</label>
              <input type="text" />
            </div>

            {/* Card number */}
            <div className="payment-flex-item card-number">
              <label>Card number</label>
              <input type="text" />
            </div>

            {/* Expiry date */}
            <div className="payment-flex-item expiry-date">
              <label>Expiry date</label>
              <input type="text" />
            </div>

            {/* CVV */}
            <div className="payment-flex-item cvv">
              <label>CVV</label>
              <input type="text" />
            </div>

            {/* Submit Button */}
            <div className="payment-submit-btn">
              <button onClick={handlePaymentSubmit}>SUBMIT</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;
