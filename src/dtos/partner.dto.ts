import { IsString } from "class-validator";

enum AddressType {
    Point = "Point",
    MultiPolygon = "MultiPolygon"
}

export class CreatePartnerDto  {
    @IsString()
    public tradingName: string;
    
    @IsString()
    public ownerName: string;
    
    @IsString()
    public document: string;

    public coverageArea: {
        type: AddressType.MultiPolygon,
        coordinates: [[[[Number]]]]
    
    };
    public address: {
        type: AddressType.Point,
        coordinates: [Number]
    };
}

export type ResponsePartnerDto = {
    _id: String,
    tradingName: String,
    ownerName: String,
    document: String,
    coverageArea: {
        type: AddressType.MultiPolygon,
        coordinates: [[[[Number]]]]
    },
    address: {
        type: AddressType.Point,
        coordinates: [Number]
    }
}