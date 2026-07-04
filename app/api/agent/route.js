import { processMessage } from "@/lib/agent";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await processMessage(body.message);

    console.log(result)

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
