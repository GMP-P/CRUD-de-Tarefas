import fs from "node:fs";
import { parse } from "csv-parse";

const csvPath = new URL("./tasks/tasks.csv", import.meta.url);

(async () => {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(
      parse({
        from_line: 2, // pula header
        trim: true
      })
    );

  for await (const record of parser) {
    const [title, description] = record;

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });
  }

  console.log("Importação concluída");
})();