import { json, LoaderArgs, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Superflare App",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ context: { session } }: LoaderArgs) {
  const flash = session.getFlash("success");

  return json({
    flash,
  });
}

export default function App() {
  const { flash } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full bg-gray-100 dark:bg-black">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {flash && <div style={{ color: "green" }}>{flash}</div>}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
