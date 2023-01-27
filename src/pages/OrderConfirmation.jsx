import courier from '../assets/img/delivery-man.png';

const OrderConfirmation = () => {
  return (
    <div className="confirm">
      <h2 className="confirm__title">Thank you for the order !</h2>
      <h4 className="confirm__subtitle">
        Our operator will contact you shortly. Expected delivery time: 30 minutes.
      </h4>
      <img width={300} src={courier} alt="courier" />
    </div>
  );
};

export default OrderConfirmation;
