import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from './logo.png';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365, #fda085);
  color: #fff;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
`;

const Label = styled.label`
  margin-right: 0.5rem;
  font-size: 1rem;
`;

const Result = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem; /* Add gap for spacing between buttons */
`;

const MultiplyAndSum = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [aValue, setAValue] = useState(1);
  const [bValue, setBValue] = useState(1);
  const [cValue, setCValue] = useState(1);

  const sum = a * aValue + b * bValue + c * cValue;

  const resetValues = () => {
    setA(0);
    setB(0);
    setC(0);
    setAValue(1);
    setBValue(1);
    setCValue(1);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add logo
    const logoWidth = 50; // Adjust as needed
    const logoHeight = 20; // Adjust as needed
    const logoX = 10; // Adjust position
    const logoY = 10; // Adjust position
    doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // Add billing text
    const billingText = 'Lift Installing Company\nBill';
    doc.setFontSize(18);
    doc.text(billingText, 20, 40); // Adjust position

    // Add line items
    doc.setFontSize(12);
    const lineItemY = 60; // Starting position for line items
    const lineHeight = 10; // Spacing between line items
    doc.text(`A x a: ${a * aValue}`, 10, lineItemY);
    doc.text(`B x b: ${b * bValue}`, 10, lineItemY + lineHeight);
    doc.text(`C x c: ${c * cValue}`, 10, lineItemY + lineHeight * 2);

    // Add total sum
    doc.setFontSize(16);
    doc.text(`Total: ${sum}`, 10, lineItemY + lineHeight * 4);

    doc.save('bill.pdf');

    // const text = `Sum: ${sum}`;
    // doc.text(text, 10, 10);
    // doc.save('sum.pdf');
  };

  return (
    <Container>
      <InputGroup>
        <Label htmlFor="a">A: </Label>
        <Input
          type="number"
          id="a"
          value={a}
          onChange={(e) => setA(parseInt(e.target.value))}
        />
        <Label htmlFor="aValue">a: </Label>
        <Input
          type="number"
          id="aValue"
          value={aValue}
          onChange={(e) => setAValue(parseInt(e.target.value))}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="b">B: </Label>
        <Input
          type="number"
          id="b"
          value={b}
          onChange={(e) => setB(parseInt(e.target.value))}
        />
        <Label htmlFor="bValue">b: </Label>
        <Input
          type="number"
          id="bValue"
          value={bValue}
          onChange={(e) => setBValue(parseInt(e.target.value))}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="c">C: </Label>
        <Input
          type="number"
          id="c"
          value={c}
          onChange={(e) => setC(parseInt(e.target.value))}
        />
        <Label htmlFor="cValue">c: </Label>
        <Input
          type="number"
          id="cValue"
          value={cValue}
          onChange={(e) => setCValue(parseInt(e.target.value))}
        />
      </InputGroup>
      <Result>Sum: {sum}</Result>
      <ButtonGroup>
        <Button onClick={resetValues}>Reset</Button>
        <Button className="button" onClick={downloadPDF}>Download Bill</Button>
      </ButtonGroup>
    </Container>
  );
};

export default MultiplyAndSum;