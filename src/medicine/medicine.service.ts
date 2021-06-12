import { Injectable, NotFoundException } from "@nestjs/common";

import { Medicine } from './medicine.model';

@Injectable()
export class MedicineService {
    private medicines: Medicine[] = [];

    insertMedicine(
        name: string,
        brand: string,
        price: number
    ) {
        const id = "MDC" + (Math.random() * 100000000).toString();
        const newMedicine = new Medicine(id, name, brand, price);
        this.medicines.push(newMedicine);
        return newMedicine;
    }

    getAllMedicine(
        brand: string
    ) {
        var medicines = this.medicines;
        if (brand) {
            medicines = medicines.filter(medicine => medicine.brand == brand);
        }
        return [...medicines];
    }

    getSingleMedicine(id: string) {
        const medicine = this.findMedicine(id)[0];
        return { ...medicine };
    }

    updateMedicine(
        id: string,
        name: string,
        brand: string,
        price: number
    ) {
        const [medicine, medicineIndex] = this.findMedicine(id);
        const updatedMedicine = {...medicine};

        if (name) {
            updatedMedicine.name = name;
        }
        if (brand) {
            updatedMedicine.brand = brand;
        }
        if (price) {
            updatedMedicine.price = price;
        }
        this.medicines[medicineIndex] = updatedMedicine;
    }

    deleteMedicine(id: string) {
        const index = this.findMedicine(id)[1];
        this.medicines.splice(index, 1); // start from index, and remove one element
    }

    private findMedicine(id: string): [Medicine, number] {
        const medicineIndex = this.medicines.findIndex(medicine => medicine.id == id);
        const medicine = this.medicines[medicineIndex];
        if (!medicine) {
            throw new NotFoundException('Medicine not found');
        }
        return [medicine, medicineIndex];
    }
}
