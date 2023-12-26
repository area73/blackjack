import { app } from "./app";

const port = 3000;
app.listen(port);

console.log(`server started on http://localhost:${port}`.green.bgBlack);
