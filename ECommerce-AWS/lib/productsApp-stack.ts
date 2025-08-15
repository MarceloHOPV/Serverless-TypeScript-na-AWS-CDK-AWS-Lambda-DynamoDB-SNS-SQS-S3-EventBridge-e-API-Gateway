import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";

export class ProductsAppStack extends cdk.Stack {
    readonly productsFetchHandler: lambdaNodeJS.NodejsFunction;// Isso daqui é pra outro serviço poder chamar meu serviço
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Criação da função Lambda
        this.productsFetchHandler = new lambdaNodeJS.NodejsFunction(this, "ProductsFetchFunction", {
            functionName: "ProductsFetchFunction",// Esse é o nome da função que vai ser visto na AWS
            entry: "lambda/products/productsFetchFunction.ts",// Esse é o arquivo que contém a função
            handler: "handler",// Esse é o nome da função dentro do arquivo que vai ser executada
            memorySize: 512,// Tamanho da memória alocada para a função
            runtime: lambda.Runtime.NODEJS_20_X,// Ambiente de execução da função
            bundling: {// Configurações de empacotamento
                minify: true,// Faz o código mais leve
                sourceMap: false,// Não gera mapa de origem o que pode dificultar a depuração mas deixa o código mais leve
            }
        })

    }

}