import fs from "fs/promises";
import path from "path";

export async function getCustomers() {
    const filePath = path.join(process.cwd(),"data","customers.json");
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data)
}

export async function getRefundPolicy() {
    const filePath = path.join(process.cwd(),"data", "refund-policy.txt");
    return await fs.readFile(filePath,"utf-8")
}

export async function findCustomer(orderId) {
  const customers = await getCustomers();

  return customers.find(
    (customer) =>
      customer.orderId.toLowerCase() === orderId.toLowerCase()
  );
}

export function checkRefundEligibility(customer) {
  if (!customer) {
    return {
      approved: false,
      reason: "Customer not found",
    };
  }

  if (customer.refunded) {
    return {
      approved: false,
      reason: "Refund has already been issued.",
    };
  }

  if (customer.daysSinceDelivery > 30) {
    return {
      approved: false,
      reason: "Refund request is outside the 30-day refund window.",
    };
  }

   if (customer.status !== "Delivered") {
    return {
      approved: false,
      reason: "Order has not been delivered."
    };
  }

    if (customer.category === "Digital") {
    return {
      approved: false,
      reason: "Digital products are not refundable."
    };
  }

  return {
    approved: true,
    reason: "Customer is eligible for a refund.",
  };
}