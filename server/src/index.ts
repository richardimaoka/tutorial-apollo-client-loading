import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { Query, Resolvers } from "./generated/graphql";
import { setTimeout } from "timers/promises";
import { defaultFieldResolver } from "graphql";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/../schema.gql"), "utf8")}
`;

interface LoadingDataContext {
  Query: Query;
}

// Hack to use Apollo's default resolver, while avoiding type errors with GraphQL codegen's auto-generated Resolver type
// https://www.apollographql.com/docs/apollo-server/data/resolvers
const useDefaultResolver: any = null;

const resolvers: Resolvers<LoadingDataContext> = {
  Query: {
    hello: async (_parent, _args, context, _info) => {
      return context.Query.hello;
    },
    search: async (_parent, _args, context, _info) => {
      console.log("waiting started");
      await setTimeout(3000, null);
      console.log("waiting ended");
      return context.Query.search;
    },
  },
  Employee: useDefaultResolver, //this will use Apollo's default resolver
};

const readJsonFile = async (relativeFileName: string): Promise<any> => {
  const jsonDataFile = __dirname.concat(relativeFileName);
  const fileContent = await fs.promises.readFile(jsonDataFile, "utf8");
  const jsonData = JSON.parse(fileContent);
  return jsonData;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) => {
    try {
      const queryData: LoadingDataContext = await readJsonFile(
        "/../data/Query.json"
      );
      return { Query: queryData };
    } catch (err) {
      console.log("***ERROR OCURRED***");
      console.log(err);
      throw new Error("internal error happened!!");
    }
  },
});

// The  method launches a web server.
server.listen().then(({ url }) => {
  console.log();
});
