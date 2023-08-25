const serve = async () => {
  try {
    console.time("app");
    const app = (await import("~/app.ts")).default;
    console.timeEnd("app");

    const port = 8000;
    const hostname = "0.0.0.0";

    const server = Deno.serve(
      {
        port,
        hostname,
        onListen: () => {
          console.log(`[authic]: ${hostname}:${port}`);
        },
      },
      app.fetch
    );

    await server.finished;

    return server;
  } catch (error) {
    console.error(error);
  }
};

await serve();
