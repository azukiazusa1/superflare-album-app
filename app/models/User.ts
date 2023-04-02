import { Model } from "superflare";
import { Album } from "./Album";
import { Image } from "./Image";

export class User extends Model {
  albums!: Album[] | Promise<Album[]>;
  images!: Image[] | Promise<Image[]>;

  $alubms() {
    return this.hasMany(Album);
  }

  $images() {
    return this.hasMany(Image);
  }

  toJSON(): Omit<UserRow, "password"> {
    const { password, ...rest } = super.toJSON();
    return rest;
  }
}

Model.register(User);

export interface User extends UserRow {}
