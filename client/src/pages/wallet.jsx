import { useEffect, useState } from "react";
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function Wallet() {
  // 🚨 Normally yeh auth se aayega (context / JWT)
  const [isSeller, setIsSeller] = useState(true); // test k liye true rakha

  const [wallet, setWallet] = useState({
    balance: 450, // PI
    currency: "PI",
    transactions: [
      {
        id: 1,
        type: "credit",
        amount: 200,
        date: "2025-08-10",
        description: "Completed Project - Web App",
      },
      {
        id: 2,
        type: "debit",
        amount: 50,
        date: "2025-08-15",
        description: "Withdrawal to Pi Wallet",
      },
      {
        id: 3,
        type: "credit",
        amount: 300,
        date: "2025-08-20",
        description: "Completed Project - Smart Contract",
      },
    ],
  });

  // 🚨 Agar seller nahi hai to unauthorized
  if (!isSeller) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Unauthorized Access 🚫
        </h1>
        <p className="text-gray-600 mt-2">
          Only sellers can view wallet & earnings.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

      {/* Balance Card */}
      <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl">Available Balance</h2>
        <p className="text-4xl font-bold mt-2">
          {wallet.balance} {wallet.currency}
        </p>
        <button className="mt-4 bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Withdraw Funds
        </button>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <div className="space-y-4">
          {wallet.transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {txn.type === "credit" ? (
                  <ArrowDownCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowUpCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{txn.description}</p>
                  <p className="text-gray-500 text-sm">{txn.date}</p>
                </div>
              </div>
              <div
                className={`font-bold ${
                  txn.type === "credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {txn.type === "credit" ? "+" : "-"}
                {txn.amount} {wallet.currency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
