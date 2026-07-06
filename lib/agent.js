import { findCustomer, checkRefundEligibility } from "./tools";
import client from "./openrouter";
import { SYSTEM_PROMPT } from "./prompts";
import { extractOrderId } from "./utils";
import { addLog, clearLogs, getLogs } from "./logger";

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

  addLog("Order Extracted", orderId);

  const customer = await findCustomer(orderId);

  addLog("Customer Lookup", customer ? "Customer Found" : "Customer Not Found");

  const decision = checkRefundEligibility(customer);

  addLog("Refund Validation", decision.reason);

  const response = await client.chat.completions.create({
    model: "google/gemma-3-4b-it",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `
Customer:
${customer.name}

Order ID:
${customer.orderId}

Product:
${customer.product}

Decision:
${decision.approved ? "Approved" : "Denied"}

Reason:
${decision.reason}

Write a customer-friendly response following the required format.
`,
      },
    ],
    max_tokens: 300,
    temperature: 0.2,
  });

  console.log(JSON.stringify(response, null, 2));

  addLog("AI Response", "Generated successfully.");
  return {
    decision,
    logs: getLogs(),
    reply: response.choices[0].message.content,
  };
}
