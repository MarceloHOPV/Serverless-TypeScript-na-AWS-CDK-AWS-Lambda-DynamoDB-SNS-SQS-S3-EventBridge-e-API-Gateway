import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import * as apigateway from"aws-cdk-lib/aws-apigateway";
import * as cwlogs from "aws-cdk-lib/aws-logs";
import {Construct} from "constructs";

interface EcommerceApiStackProps extends cdk.StackProps {
    productsFetchHandler: lambdaNodeJS.NodejsFunction;// Isso daqui é pra outro serviço poder chamar meu serviço
}

export class EcommerceApiStack extends cdk.Stack {
    // Não tem atributo de classe porque nenhuma stack vai chamar esse recurso diretamente
    constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
        super(scope, id, props);

        const logGroup = new cwlogs.LogGroup(this, "ECommerceApiLogs"); // Grupo de logs para a API
        const api = new apigateway.RestApi(this, "EcommerceApi", {
            restApiName: "EcommerceApi",
            deployOptions:{
                accessLogDestination: new apigateway.LogGroupLogDestination(logGroup), // Configuração de logs de acesso
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({ // Formato dos logs de acesso
                    httpMethod: true, // método HTTP da requisição
                    ip: true, // endereço IP do cliente
                    protocol: true, // protocolo da requisição tipo HTTP
                    requestTime: true, // hora da requisição
                    resourcePath: true, // caminho do recurso
                    responseLength: true, // tamanho da resposta
                    status: true, // status da resposta
                    caller: true, // quem fez a chamada no sentido de origem do pedido
                    user: true // usuário que fez a requisição
                })
            }
        });

        const productsFetchIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler); // Integração com a função Lambda
        // "/products"
        const productsResource = api.root.addResource("products"); // Recurso da API para produtos
        productsResource.addMethod("GET", productsFetchIntegration); // Método GET para buscar produtos
    }
}