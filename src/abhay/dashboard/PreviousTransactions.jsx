import { useUser } from "@/auth/UserContext";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function PreviousTransactions() {
  const { loadTransactionsLocal, retrieveChatLogsLocal } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [expanded, setExpanded] = useState({}); // track expanded rows
  const [chatLogs, setChatLogs] = useState({}); // store chat logs by cid

  // Load transactions from localStorage on mount
  useEffect(() => {
    const result = loadTransactionsLocal();
    setTransactions(result);
  }, [loadTransactionsLocal]);

  const handleToggleChat = (cid) => {
    setExpanded((prev) => ({ ...prev, [cid]: !prev[cid] }));

    if (!chatLogs[cid]) {
      try {
        const logs = retrieveChatLogsLocal(cid);
        setChatLogs((prev) => ({ ...prev, [cid]: logs }));
      } catch (error) {
        console.error("Error fetching chat logs:", error);
      }
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of registered products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>CID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No transactions yet.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx, idx) => (
              <React.Fragment key={idx}>
                <TableRow>
                  <TableCell className="font-medium">
                    {tx.product?.name || "N/A"}
                  </TableCell>
                  <TableCell>₹{tx.product?.price || "N/A"}</TableCell>
                  <TableCell>{tx.product?.origin || "N/A"}</TableCell>
                  <TableCell className="truncate max-w-[120px]">
                    {tx.cid}
                  </TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleToggleChat(tx.cid)}>
                      {expanded[tx.cid] ? "Hide Chat" : "View Chat"}
                    </Button>
                  </TableCell>
                </TableRow>

                {expanded[tx.cid] && chatLogs[tx.cid] && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="bg-gray-100 p-3 rounded-lg space-y-2 max-h-[300px] overflow-y-auto">
                        {chatLogs[tx.cid].map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${
                              msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}>
                            <div
                              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                                msg.role === "user"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-900"
                              }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default PreviousTransactions;
