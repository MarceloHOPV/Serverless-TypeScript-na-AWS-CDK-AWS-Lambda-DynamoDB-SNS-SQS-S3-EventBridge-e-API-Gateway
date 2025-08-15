import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, // event é o objeto que contém informações sobre a requisição HTTP
    context: Context // context é o objeto que contém informações sobre a execução da função Lambda como o id
    ): Promise<APIGatewayProxyResult> // isso é o que a função retorna
    {

    const lambdaRequestId = context.awsRequestId; // obtém o ID da requisição
    const apiRequestId = event.requestContext.requestId; // obtém o ID da requisição API

    console.log(`Lambda Request ID: ${lambdaRequestId}`); // registra o ID da requisição Lambda no CloudWatch
    console.log(`API Request ID: ${apiRequestId}`); // registra o ID da requisição API no CloudWatch

    const method = event.httpMethod;// verifica se é um evento http

    if(event.resource === "/products"){
        if(method === "GET"){ // verifica se o método é GET
            console.log('GET'); // registra que o método GET foi chamado no CloudWatch

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "GET request successful"
                })
            };
        }
    }
    return {
        statusCode: 404,
        body: JSON.stringify({
            message: "Not Found"
        })
    };
}
