import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";
import livereload from "livereload";
import connectLivereload from "connect-livereload";

import rootRoutes from "./routes/root";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if(process.env.NODE_ENV === "development"){
  const reloadServer = livereload.createServer();
  reloadServer.watch(path.join(process.cwd(), "src", "public"));
  reloadServer.server.once("connection", () =>{
    setTimeout(() =>{
      reloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLivereload());
}

app.use(morgan("dev"));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");

app.use("/", rootRoutes);

app.use((_request, _response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
