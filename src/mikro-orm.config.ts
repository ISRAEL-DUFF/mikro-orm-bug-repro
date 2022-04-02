import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { join } from "path";
import { env } from "process";

const environment = env.NODE_ENV ?? "development";
const mikroormOptions: Options<PostgreSqlDriver> = {
  allowGlobalContext: true,
  cache: {
    enabled: environment === "production",
    options: { cacheDir: join(__dirname, "..", ".cache/mikroorm") },
  },
  dbName: "mikro_orm_bug_repro",
  debug: env.NODE_ENV !== "testing",
  driverOptions: {
    connection: {
      ssl:
        environment === "production"
          ? {
              rejectUnauthorized:
                env.MIKRO_ORM_SSL_VERIFY == "true" ? true : false,
            }
          : false,
    },
  },
  entities: ["**/*.entity.js"],
  entitiesTs: ["**/*.entity.ts"],
  forceUtcTimezone: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    disableForeignKeys: false,
    path: "dist/migrations",
    pathTs: "src/migrations",
    snapshot: false,
    tableName: "_mikroorm_migrations",
  },
  name: "main",
  pool: {
    max: 5,
    min: 5,
  },
  strict: true,
  type: "postgresql",
  validate: true,
};

if (environment !== "development")
  mikroormOptions.logger = (): void => undefined;

export default mikroormOptions;
