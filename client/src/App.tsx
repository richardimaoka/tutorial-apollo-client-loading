import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { SearchResult } from "./SearchResult";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  //https://www.the-guild.dev/graphql/codegen/plugins/typescript/typescript-apollo-client-helpers
  cache: new InMemoryCache(),
});

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <SearchResult />
    </ApolloProvider>
  );
};
