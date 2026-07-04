export function extractOrderId(message) {
    const match = message.match(/ORD\d+/i);

    return match ? match[0].toUpperCase() : null;
}