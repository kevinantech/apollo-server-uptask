
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./source/**/schema/*.graphql",
  generates: {
    "types.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
