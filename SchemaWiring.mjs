import { GetUserDataFetcher, GetTasksDataFetcher, AddTasksDataFetcher } from "./DataFetchers.mjs";
import { GraphQL, RuntimeWiring, SchemaGenerator, SchemaParser } from "@vertx/web-graphql";
// const GraphQL = Java.type("graphql.GraphQL");
// const RuntimeWiring = Java.type("graphql.schema.idl.RuntimeWiring");
// const SchemaGenerator = Java.type("graphql.schema.idl.SchemaGenerator");
// const SchemaParser = Java.type("graphql.schema.idl.SchemaParser");

function generateRunTimeWiring() {  
  //console.log(RuntimeWiring.newRuntimeWiring().type("", () => {}));
  const wiring = RuntimeWiring.newRuntimeWiring()
    .type("Query", function(typeWiring) {         
      typeWiring
        .dataFetcher("getUser", GetUserDataFetcher)
        .dataFetcher("getTasks", GetTasksDataFetcher);
      console.log(typeWiring);
    })
    .type("Mutation", function(typeWiring)  {         
      typeWiring
        .dataFetcher("addTask", AddTasksDataFetcher);
        console.log(AddTasksDataFetcher);
    })
    .build();      
}

function getSchemaWiring(schemaStr) {
  const schemaParser = new SchemaParser();
  const typeRegistry = schemaParser.parse(schemaStr);

  const wiring = generateRunTimeWiring();

  const schemaGenerator = new SchemaGenerator();
  return schemaGenerator.makeExecutableSchema(typeRegistry, wiring)
}

export function getGraphQL(schemaStr) {
  const schema = getSchemaWiring(schemaStr)
  return GraphQL.newGraphQL(schema).build();
}