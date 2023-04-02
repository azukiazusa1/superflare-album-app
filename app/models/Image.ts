import { Model } from "superflare";
import { Album } from "./Album";
import { User } from "./User";

export class Image extends Model {
  album!: Album | Promise<Album>;
  user!: User | Promise<User>;

  $album() {
    return this.belongsTo(Album);
  }

  $user() {
    return this.belongsTo(User);
  }

  toJSON(): ImageRow {
    return super.toJSON();
  }
}

Model.register(Image);

export interface Image extends ImageRow {}
