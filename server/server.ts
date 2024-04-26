import express from "express";
import * as path from "path";
import pg from "pg";

const postgresql: pg.Pool = new pg.Pool({
  user: "postgres",
  database: "norway_data",
});

const app = express();

app.get("/api/kommuner.old", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve("../public/kommuner.json"));
});
app.get(
  "/api/kommuner",
  async (req: express.Request, res: express.Response) => {
    const result = await postgresql.query(
      "select kommunenummer, kommunenavn, st_simplify(st_transform(omrade, 4326), 0.001)::json as geometry from kommuner",
    );
    res.json({
      type: "FeatureCollection",
      features: result.rows.map(({ kommunenummer, kommunenavn, geometry }) => ({
        type: "Feature",
        geometry,
        properties: { kommunenummer, kommunenavn },
      })),
    });
  },
);

app.listen(3000);
