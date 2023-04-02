import { type LoaderArgs, redirect, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { User } from "~/models/User";
import { Album } from "~/models/Album";

export async function loader({ context: { auth } }: LoaderArgs) {
  if (!(await auth.check(User))) {
    return redirect("/auth/login");
  }

  // ログインしているユーザーのアルバムを取得
  const albums = await Album.where("userId", await auth.id())
    .orderBy("createdAt", "desc")
    .with("images");

  return json({
    user: (await auth.user(User)) as User,
    albums,
  });
}

export async function action({
  request,
  context: { auth, session },
}: LoaderArgs) {
  // ログインしているか確認
  if (!(await auth.check(User))) {
    return redirect("/auth/login");
  }

  // フォームデータを取得
  const body = await request.formData();
  const title = body.get("title") as string;
  const description = body.get("description") as string;

  // ログインしているユーザーのIDを取得
  const userId = await auth.id();

  // アルバムを作成
  await Album.create({
    title,
    description,
    userId,
  });

  // フラッシュメッセージをセット
  session.flash("success", "Album created successfully");

  // ダッシュボードにリダイレクト
  return redirect("/dashboard");
}

export default function Dashboard() {
  const { user, albums } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Dashboard</h1>
      <p>You're logged in as {user.email}</p>

      <form method="post">
        <fieldset>
          <legend>Create Album</legend>

          <div>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" required />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" required />
          </div>

          <button type="submit">Create</button>
        </fieldset>
      </form>

      <h2>Albums</h2>
      {albums.length ? (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <a href={`/albums/${album.id}`}>{album.title}</a>
              <span> - {album.imageCount} images</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any albums yet</p>
      )}

      <form method="post" action="/auth/logout" style={{ marginTop: "2rem" }}>
        <button type="submit">Log out</button>
      </form>
    </>
  );
}
