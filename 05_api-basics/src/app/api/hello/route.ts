export async function GET(){
    return Response.json({
        message : "Hello From API"
    })
}
export async function POST(req : Request) {
    const body = await req.json();
    return Response.json({
        message : "Data Received",
        data : body,
    })
}