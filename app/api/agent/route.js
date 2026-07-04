export async function POST(request) {
    const body = await request.json();

    return Response.json({
        success : true,
        message : "API is working",
        useMessage : body.messgae
    })
}