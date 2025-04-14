import { Controller, Get } from "@nestjs/common";

@Controller("")
export class AppController {
  constructor() {}

  @Get("")
  Welcome() {
    return "Benvenuto all'API di CAFnow";
  }
}
