import Head from "next/Head";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>Pokedex App</title>
        <link rel="shortcut icon" href="./pokeball.png" />
      </Head>
      <main>{children}</main>
      <style jsx>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
          }
          * {
            box-sizing: border-box;
          }
          .container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #b9b9b9;
          }
          main {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
          }
        `}
      </style>
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
}
