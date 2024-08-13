import App from "./app";
import 'dotenv/config';
import { PartnerRoute } from "./routes/partner.route";

const app = new App([
  new PartnerRoute()
]);

app.listen();
