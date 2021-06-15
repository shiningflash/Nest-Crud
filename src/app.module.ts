import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
    imports: [
        ProductsModule,
        MedicineModule,
        MongooseModule.forRoot(
            'mongodb+srv://mydb:mypass@cluster0.4hxv3.mongodb.net/demo-db?retryWrites=true&w=majority'
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
