import { Router } from "express";
import PartnerController from "../controllers/partner.controller";
import Route from "../interfaces/route.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreatePartnerDto } from "../dtos/partner.dto";

export class PartnerRoute implements Route {
    public path: string = '/partner';
    public router: Router = Router();
    public partnerController: PartnerController = new PartnerController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreatePartnerDto, false), this.partnerController.createPartner);
        this.router.get(`${this.path}/:id`, this.partnerController.getPartnerById);
    }
}