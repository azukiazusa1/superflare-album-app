import { Model } from "superflare";
import { Image } from "./Image";
import { User } from "./User";

export class Album extends Model {
  images!: Image[] | Promise<Image[]>;
  user!: User | Promise<User>;

  $images() {
    return this.hasMany(Image);
  }

  $user() {
    return this.belongsTo(User);
  }

  get imageCount(): number {
    return this.$images.length;
  }

  toJSON(): AlbumRow & { imageCount: number } {
    return {
      ...super.toJSON(),
      imageCount: this.imageCount,
    };
  }
}
Model.register(Album);

export interface Album extends AlbumRow {}
