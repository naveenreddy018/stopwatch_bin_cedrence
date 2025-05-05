import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Col,
  Row,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import './payment.css'; // Import the CSS file

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState('UPI');
  const [timer, setTimer] = useState(900); // 15 minutes = 900 seconds
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [bank, setBank] = useState('');
  const [emiPlan, setEmiPlan] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = useMemo(() => {
    const min = String(Math.floor(timer / 60)).padStart(2, '0');
    const sec = String(timer % 60).padStart(2, '0');
    return `${min}:${sec}`;
  }, [timer]);

  const handlePayment = () => {
    switch (selectedOption) {
      case 'UPI':
        if (!upiId) return setMessage('Please enter your UPI ID.');
        return setMessage(`Processing UPI Payment with ID: ${upiId}`);
      case 'Card':
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
          return setMessage('Please fill all card details.');
        return setMessage('Processing Card Payment...');
      case 'NetBanking':
        if (!bank) return setMessage('Please select your bank.');
        return setMessage(`Processing Net Banking through ${bank}`);
      case 'EMI':
        if (!emiPlan) return setMessage('Please select an EMI plan.');
        return setMessage(`Processing EMI Plan: ${emiPlan}`);
      case 'COD':
        return setMessage('Cash on Delivery selected.');
      default:
        return;
    }
  };

  return (
    <Container className="payment-container">
      <Card className="payment-card">
        <h4 className="mb-4">Payment Options</h4>
        <div className="payment-timer">
          <FaClock className="me-2" />
          <strong>Complete payment in:</strong>
          <span>{formatTime}</span>
        </div>

        <Form>
          {/* UPI Option */}
          <Form.Check
            type="radio"
            label="UPI"
            checked={selectedOption === 'UPI'}
            onChange={() => setSelectedOption('UPI')}
            className="payment-option"
          />
          {selectedOption === 'UPI' && (
            <Form.Group as={Row} className="payment-form-group">
              <Form.Label column sm="3">
                Your UPI ID
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="payment-input"
                />
              </Col>
            </Form.Group>
          )}

          {/* Card Option */}
          <Form.Check
            type="radio"
            label="Credit / Debit / ATM Card"
            className="payment-option"
            checked={selectedOption === 'Card'}
            onChange={() => setSelectedOption('Card')}
          />
          {selectedOption === 'Card' && (
            <div className="payment-input mt-3">
              <Form.Control
                className="mb-2"
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <Row>
                <Col>
                  <Form.Control
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="CVV"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                </Col>
              </Row>
            </div>
          )}

          {/* Net Banking */}
          <Form.Check
            type="radio"
            label="Net Banking"
            className="payment-option"
            checked={selectedOption === 'NetBanking'}
            onChange={() => setSelectedOption('NetBanking')}
          />
          {selectedOption === 'NetBanking' && (
            <Form.Select
              className="payment-input mt-2"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Select Bank</option>
              <option value="HDFC">HDFC</option>
              <option value="SBI">SBI</option>
              <option value="ICICI">ICICI</option>
            </Form.Select>
          )}
          <div className="text-muted ms-4">
            This instrument has low success, use UPI or cards for better experience
          </div>

          {/* EMI */}
          <Form.Check
            type="radio"
            label="EMI (Easy Installments)"
            className="payment-option"
            checked={selectedOption === 'EMI'}
            onChange={() => setSelectedOption('EMI')}
          />
          {selectedOption === 'EMI' && (
            <Form.Select
              className="payment-input mt-2"
              value={emiPlan}
              onChange={(e) => setEmiPlan(e.target.value)}
            >
              <option value="">Select EMI Plan</option>
              <option value="3M">3 Months - 0% Interest</option>
              <option value="6M">6 Months - 5% Interest</option>
              <option value="12M">12 Months - 10% Interest</option>
            </Form.Select>
          )}

          {/* COD */}
          <Form.Check
            type="radio"
            label="Cash on Delivery"
            className="payment-option"
            checked={selectedOption === 'COD'}
            onChange={() => setSelectedOption('COD')}
          />

          <Button className="mt-4 w-100" onClick={handlePayment} variant="primary">
            Proceed with {selectedOption}
          </Button>

          {message && <Alert className="payment-alert" variant="info">{message}</Alert>}
        </Form>
      </Card>
    </Container>
  );
};

export default PaymentOptions;
