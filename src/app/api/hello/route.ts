export async function GET(){
    return Response.json({message: "Hello World!"});
}

export async function POST(req:Request){
    const userData = await req.json()
    return Response.json({userData, message: "Hello World!"});
}