import store from "@app/store/store";
import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/globals.css";

if (process.env.ENV === "production") {
  console.log = () => {};
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>My Netflix</title>
        <meta
          name="description"
          content="This is my Netflix clone website by Next.js and Tailwind.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
