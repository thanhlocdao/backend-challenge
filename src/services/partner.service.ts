import { CreatePartnerDto, ResponsePartnerDto } from "../dtos/partner.dto";
import mongodb from "../models/index";

class PartnerServive {
    async createPartner(data: CreatePartnerDto): Promise<{error: boolean, message?: String, data?: ResponsePartnerDto}> {
        try {
            const partner = await mongodb.Partner.findOne({ document: data.document });
            if (partner) {
                return {error: true, message: "Partner already exists"};
            }

            const newPartner = await mongodb.Partner.create(data);
            const result: ResponsePartnerDto = {
                _id: newPartner._id.toString(),
                tradingName: newPartner.tradingName,
                ownerName: newPartner.ownerName,
                document: newPartner.document,
                coverageArea: data.coverageArea,
                address: data.address
            }
            return { error: false, data: result };
        } catch (error: Error | any) {
            return { error: true, message: error.message };
        }
    }

    async getPartnerById(id: string): Promise<{error: boolean, message?: String, data?: ResponsePartnerDto}> {
        try {
            const partner = await mongodb.Partner.findById(id);
            if (!partner) {
                return {error: true, message: "Partner not found"};
            }
            const result: ResponsePartnerDto = {
                _id: partner._id.toString(),
                tradingName: partner.tradingName,
                ownerName: partner.ownerName,
                document: partner.document,
                coverageArea: partner.coverageArea as any,
                address: partner.address as any
            }
            return { error: false, data: result };
        } catch (error: Error | any) {
            return { error: true, message: error.message };
        }
    }

    async getPartnerByLocation(latitude: number, longitude: number): Promise<{error: boolean, message?: String, data?: any}> {
        try {
            const partner = await mongodb.Partner.findOne({
                coverageArea: {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        }
                    }
                },
                address: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        }
                    }
                }
            });
            if (!partner) {
                return {error: true, message: "Partner not found"};
            }
            // const result: ResponsePartnerDto = {
            //     _id: partner._id.toString(),
            //     tradingName: partner.tradingName,
            //     ownerName: partner.ownerName,
            //     document: partner.document,
            //     coverageArea: partner.coverageArea as any,
            //     address: partner.address as any
            // }
            return { error: false, data: partner };
        } catch (error: Error | any) {
            return { error: true, message: error.message };
        }
    }
}

export default PartnerServive;