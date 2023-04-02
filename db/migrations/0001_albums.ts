import { Schema } from "superflare";

export default function () {
  return Schema.create("albums", (table) => {
    table.increments("id");
    table.string("title");
    table.string("description");
    table.integer("userId");
    table.timestamps();
  });
}
