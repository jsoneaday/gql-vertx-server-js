import { Router } from '@vertx/web';
import { getGraphQL } from './SchemaWiring';

const CorsHandler = Java.type("io.vertx.ext.web.handler.CorsHandler");
const GraphQLHandler = Java.type("io.vertx.ext.web.handler.graphql.GraphQLHandler");
const HashSet = Java.type('java.util.HashSet');

vertx.fileSystem().readFile("graphqlSchema.graphqls", handler => {
  if(handler.succeeded()) {
    const router = Router.router(vertx);
    const allowedHeaders = new HashSet();
    allowedHeaders.add("Content-Type");
    router
      .route()
      .handler(CorsHandler.create("http://localhost:4000")
        .allowedHeaders(allowedHeaders));

    const schemaStr = handler.result().toString();
    const graphQL = getGraphQL(schemaStr);
    router.post("/graphql").handler(GraphQLHandler.create(graphQL));

    vertx.createHttpServer().requestHandler(router).listen(9999);
  } 
});