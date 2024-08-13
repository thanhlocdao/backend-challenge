import { NextFunction, Request, Response } from 'express';
import { CreatePartnerDto, ResponsePartnerDto } from '../dtos/partner.dto';
import PartnerServive from '../services/partner.service';
import HttpException from '../exceptions/httpException';

export default class PartnerController {
    private partnerService: PartnerServive = new PartnerServive();

    public createPartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data: CreatePartnerDto = req.body;
        try {
            const result = await this.partnerService.createPartner(data);
            if (!result.error) {
                res.status(201).json(result.data);
            } else {
                next(new HttpException(400, result.message + ''));
            }
        } catch (error: Error | any) {
            next(new HttpException(400, error?.message));
        }
    }

    public getPartnerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        try {
            const result = await this.partnerService.getPartnerById(id);
            if (!result.error) {
                res.status(200).json(result.data);
            } else {
                next(new HttpException(400, result.message + ''));
            }
        } catch (error: Error | any) {
            next(new HttpException(400, error?.message));
        }
    }
    
}