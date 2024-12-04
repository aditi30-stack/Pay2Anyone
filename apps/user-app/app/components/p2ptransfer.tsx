"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/Input";
import { useState } from "react";
import P2PAction from "../lib/actions/p2ptransferaction";

const P2P = () => {
  const [phone, setPhone] = useState<string>(""); 
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("")

  const AddPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim(); 
    if (!/^\d*$/.test(value)) {
      setError("Phone number must contain only digits!");
      return;
    }

    if (value.length > 10) {
      setError("Phone number cannot exceed 10 digits!");
      return;
    }

    setError(""); 
    setPhone(value);
  };

  const AddAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim(); 
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Amount must be a valid number!");
      return;
    }

    if (parseFloat(value) <= 0) {
      setError("Amount must be greater than 0!");
      return;
    }

    setError(""); 
    setAmount(value);
  };

  const SendMoney = async () => {
    try {
      setSuccess("")
      setError("");
      const numericPhone = parseInt(phone);
      const numericAmount = parseFloat(amount);

      if (!numericPhone || phone.length !== 10) {
        setError("Invalid phone number!");
        return;
      }

      if (isNaN(numericAmount) || (numericAmount) <= 0) {
        setError("Invalid amount!");
        return;
      }

      let res = await P2PAction(numericPhone, numericAmount);
      console.log(res)
      setPhone("");
      setAmount("");
     if(res?.error) {
      setError(res.error)
      setSuccess("")
     }
     else if(res?.message){
      setSuccess(res?.message)
      setError("")
     }
    
    } catch (e) {
      setError("Error occurred while sending money!");
      setSuccess("")
    }
  };

  return (
    <div className="bg-slate-100 rounded-md z-20 w-[20vw] min-h-[50vh] max-h-[45vh] px-10 mx-auto my-20 border flex flex-col items-center justify-center">
      <Input
        label="Number: "
        placeholder="1234567890"
        value={phone}
        onChange={AddPhoneNumber}
      />
      <Input
        label="Amount: "
        placeholder="0"
        value={amount}
        onChange={AddAmount}
      />
      <Button onClick={SendMoney}>Send</Button>
      {error && <div className="font-bold text-red-500">{error}</div>}
      {success && (
        <div className="font-bold text-green-500">
        {success}
        </div>
    )}
    </div>
  );
};

export default P2P;
