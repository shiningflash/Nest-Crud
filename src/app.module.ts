import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
    imports: [ProductsModule, MedicineModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
