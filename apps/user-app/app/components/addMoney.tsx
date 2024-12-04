"use client";

import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/Input";
import { Select } from "@repo/ui/select";
import { Button } from "@repo/ui/button";
import { onRampTransaction } from "../lib/actions/onRamtxn";

const supportedBanks = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

export const AddMoney = () => {
  const [amount, setAmount] = useState<string>("0");
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>("");
  const [provider, setProvider] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "HDFC Bank") {
      setRedirectUrl(supportedBanks[0]?.redirectUrl);
      setProvider("HDFC Bank");
    } else if (value === "Axis Bank") {
      setRedirectUrl(supportedBanks[1]?.redirectUrl);
      setProvider("Axis Bank");
    } else {
      setRedirectUrl("");
    }
  };

  const AddAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const CreateTransaction = async (provider: string, amountStr: string) => {
    try {
      setError("");
      setSuccess("");

      const parsedAmount = parseFloat(amountStr);

      if (!provider) {
        setError("Please provide the bank name");
        return;
      }

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError("Amount must be a valid number greater than 0");
        return;
      }

     
      await onRampTransaction(provider, parsedAmount);
      setSuccess("Request sent successfully!");
      setAmount("0");
      setProvider("");
      setError("");
    } catch (e) {
      console.log(e);
      setError("Error adding transaction");
    }
  };

  return (
    <div>
      <h1 className="text-purple-500 font-bold text-2xl mt-4">Transfer</h1>

      {/* Add Money Card */}
      <Card title="Add Money">
        <Input
          onChange={AddAmount}
          label="Amount: "
          placeholder="Amount"
          value={amount}
        />
        <Select
          onChange={handleChange}
          label="Bank"
          option={["HDFC Bank", "Axis Bank"]}
          value={provider}
        />
        <div className="mt-2 text-center">
          <Button
            onClick={() => {
              CreateTransaction(provider || "", amount);
            }}
          >
            Add Money
          </Button>
        </div>
        {error && <div className="font-bold text-red-500">{error}</div>}
        {success && <div className="font-bold text-green-500">{success}</div>}
      </Card>
    </div>
  );
};
