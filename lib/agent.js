import { findCustomer, checkRefundEligibility } from "./tools";
import client from "./openrouter";
import { SYSTEM_PROMPT } from "./prompts";
import { extractOrderId } from "./utils";
import { addLog, clearLogs,getLogs } from "./logger";

export async function processMessage(userMessage) {
  clearLogs();

  addLog("Message Received", userMessage);

  const orderId = extractOrderId(userMessage);

  if (!orderId) {
    addLog("Order Extraction", "Order ID not found.");

    return {
      reply: "Please provide your order ID (example: ORD1001).",
    };
  }

   addLog(
    "Order Extracted",
    orderId
  );

  const customer = await findCustomer(orderId);

  addLog(
    "Customer Lookup",
    customer
      ? "Customer Found"
      : "Customer Not Found"
  );

  const decision = checkRefundEligibility(customer);

   addLog(
    "Refund Validation",
    decision.reason
  );

  const response = await client.chat.completions.create({
    model: "openrouter/free",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `
Customer Information:

${JSON.stringify(customer, null, 2)}

Decision:

${decision.reason}

Approved:

${decision.approved}

Write a friendly response for the customer.
`,
      },
    ],
    max_tokens: 300,
    temperature: 0.2,
  });


  addLog(
    "AI Response",
    "Generated successfully."
  );
  return {
    decision,
    logs : getLogs(),
    reply: response.choices[0].message.content,
  };
}
