import { Request, Response, NextFunction } from "express";
import { get, post, controller, bodyValidator } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
        <form method="POST">
          <div>
              <label>Email</label>
              <input name="email" />
          </div>
          <div>
              <label>Password</label>
              <input name="password" type="password" />
          </div>
          <button>Submit</button>
        </form>
        `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "test@test.com" && password === "password") {
      // mark the person as logged in
      req.session = { loggedIn: true };
      // redirect to root route
      res.redirect("/");
      res.send(email + password);
    } else {
      res.status(400).send("You must provide a email and password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }
}
