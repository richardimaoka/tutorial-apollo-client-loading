import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.gql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
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
