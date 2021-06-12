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
    addMedicine(
        @Body('name') name: string,
        @Body('brand') brand: string,
        @Body('price') price: number
    ) {
        const medicine = this.medicineService.insertMedicine(name, brand, price);
        return medicine;
    }

    @Get()
    getAllMedicine(
        @Query('brand') brand: string
    ) {
        return this.medicineService.getAllMedicine(brand);
    }

    @Get(':id')
    getMedicine(@Param('id') id: string) {
        return this.medicineService.getSingleMedicine(id);
    }

    @Patch(':id')
    updateMedicine(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('brand') brand: string,
        @Body('price') price: number
    ) {
        this.medicineService.updateMedicine(id, name, brand, price);
        return { success: true, message: 'Updated successfully' };
    }

    @Delete(':id')
    removeMedicine(@Param('id') id: string) {
        this.medicineService.deleteMedicine(id);
        return { success: true, message: "Deleted successfully" };
    }
}