import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Query,
    Param
} from "@nestjs/common";

import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {};

    @Post()
    async addMedicine(
        @Body('name') name: string,
        @Body('brand') brand: string,
        @Body('price') price: number
    ) {
        const medicine = await this.medicineService.insertMedicine(name, brand, price);
        return medicine;
    }

    @Get()
    async getAllMedicine(
        @Query('brand') brand: string
    ) {
        const medicines = await this.medicineService.getAllMedicine(brand);
        return medicines;
    }

    @Get(':id')
    async getMedicine(@Param('id') id: string) {
        const medicine = await this.medicineService.getSingleMedicine(id);
        return medicine;
    }

    @Patch(':id')
    async updateMedicine(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('brand') brand: string,
        @Body('price') price: number
    ) {
        await this.medicineService.updateMedicine(id, name, brand, price);
        return { success: true, message: 'Updated successfully' };
    }

    @Delete(':id')
    async removeMedicine(@Param('id') id: string) {
        await this.medicineService.deleteMedicine(id);
        return { success: true, message: "Deleted successfully" };
    }
}