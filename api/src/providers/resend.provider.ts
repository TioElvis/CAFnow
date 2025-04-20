import { Resend } from "resend";
import { join } from "node:path";
import Handlebars from "handlebars";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEMPLATES_ROOT } from "../lib/constants";
import { SendWelcomeMail } from "../types/resend";
import { existsSync, readFileSync } from "node:fs";

@Injectable()
export class ResendProvider {
  private resend: Resend;

  constructor(private _ConfigService_: ConfigService) {
    this.resend = new Resend(
      this._ConfigService_.get<string>("RESEND_API_KEY"),
    );
  }

  private CompileTemplate(name: string, context: Record<string, any>) {
    const path = join(TEMPLATES_ROOT, `${name}.hbs`);

    if (existsSync(path) === false) {
      throw new Error(`Template not found: ${name}.hbs`);
    }

    const source = readFileSync(path, "utf8");
    const compiled = Handlebars.compile(source);

    return compiled(context);
  }

  async SendWelcomeMail(context: SendWelcomeMail) {
    try {
      let href: URL;

      if (process.env.NODE_ENV === "production") {
        const domain = this._ConfigService_.get<string>("DOMAIN");
        href = new URL("/auth/sign-in", `https://${domain}`);
      } else {
        href = new URL("/auth/sign-in", "http://localhost:3000");
      }

      const html = this.CompileTemplate("welcome", {
        href,
        ...context,
      });

      const from = this._ConfigService_.get<string>("RESEND_MAIL");

      if (from === undefined) {
        throw new Error("Email mittente non valido");
      }

      await this.resend.emails.send({
        from,
        html,
        to: context.email,
        subject: "Benvenuto utente",
      });
    } catch (error) {
      console.error(error);
      throw new Error("Errore nel invio della mail");
    }
  }
}
