import app from './server/bootstrap';

export default async (port, handler, render) => {
    const server = await app(port, handler, render);

    http.createServer(server.callback())
        .listen(port, (err) => {
            if (err) throw err;

            console.log(`> Ready on http://localhost:${port}`);
        });
};
