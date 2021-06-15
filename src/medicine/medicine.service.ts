import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { Medicine } from './medicine.model';

@Injectable()
export class MedicineService {
    constructor(
        @InjectModel('Medicine') private readonly medicineModel: Model<Medicine>,
    ) {}

    async insertMedicine(
        name: string,
        brand: string,
        price: number
    ) {
        const newMedicine = new this.medicineModel({
            name, brand, price
        });
        await newMedicine.save();
        return this.formatMedicine(newMedicine);
    }

    async getAllMedicine(
        brand: string
    ) {
        var medicines = await this.medicineModel.find().exec();
        // if (brand) {
        //     medicines = medicines.filter(medicine => medicine.brand == brand);
        // }
        return medicines.map(medicine => this.formatMedicine(medicine));
    }

    async getSingleMedicine(id: string) {
        const medicine = await this.findMedicine(id);
        return this.formatMedicine(medicine);
    }

    async updateMedicine(
        id: string,
        name: string,
        brand: string,
        price: number
    ) {
        const updatedMedicine = await this.findMedicine(id);
        if (name) {
            updatedMedicine.name = name;
        }
        if (brand) {
            updatedMedicine.brand = brand;
        }
        if (price) {
            updatedMedicine.price = price;
        }
        updatedMedicine.save();
        return this.formatMedicine(updatedMedicine);
    }

    async deleteMedicine(id: string) {
        const result = await this.medicineModel.deleteOne({_id: id}).exec();
        if (result.n == 0) {
            throw new NotFoundException('Medicine not found');
        }
    }

    private async findMedicine(id: string): Promise<Medicine> {
        let medicine;
        try {
            medicine = await this.medicineModel.findById(id);
        } catch(error) {
            throw new NotFoundException('Medicine not found');
        }
        if (!medicine) {
            throw new NotFoundException('Medicine not found');
        }
        return medicine;
    }

    private formatMedicine(medicine: Medicine) {
        return {
            id: medicine.id,
            name: medicine.name,
            brand: medicine.brand,
            price: medicine.price,
        }
    }
}
