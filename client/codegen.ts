import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/schema.gql",
  documents: "src/**/*.tsx",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        avoidOptionals: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: ["npx prettier --write"],
  },
};

export default config;
