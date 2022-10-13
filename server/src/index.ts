import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { setTimeout } from "timers/promises";
import { Query, Resolvers } from "./generated/graphql";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/../schema.gql"), "utf8")}
`;

const readJsonFileSync = (relativeFileName: string): Query => {
  const jsonDataFile = __dirname.concat(relativeFileName);
  const fileContent = fs.readFileSync(jsonDataFile, "utf8");
  const jsonData = JSON.parse(fileContent);
  return jsonData;
};

//throws on error
const queryDataSync: Query = readJsonFileSync("/../data/Query.json");

// Hack to use Apollo's default resolver, while avoiding type errors with GraphQL codegen's auto-generated Resolver type
// https://www.apollographql.com/docs/apollo-server/data/resolvers
const useDefaultResolver: any = null;

const resolvers: Resolvers = {
  Query: {
    hello: async (_parent, _args, _context, _info) => {
      return queryDataSync.hello;
    },
    search: async (_parent, _args, context, _info) => {
      console.log("waiting started");
      await setTimeout(3000, null);
      console.log("waiting ended");
      return queryDataSync.search;
    },
  },
  Employee: useDefaultResolver, //this will use Apollo's default resolver
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The  method launches a web server.
server.listen().then(({ url }) => {
  console.log();
});
