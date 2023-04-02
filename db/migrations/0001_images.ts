import { Schema } from "superflare";

export default function () {
  return Schema.create("images", (table) => {
    table.increments("id");
    table.string("key");
    table.integer("albumId");
    table.integer("userId");
    table.timestamps();
  });
}
