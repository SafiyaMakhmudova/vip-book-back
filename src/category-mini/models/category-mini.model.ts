import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Books} from "../../books/models/book.model";

interface CategMiniAttrs {
    name: string;
    total: number;
}


@Table({tableName:'CategoryMini'})
export class CategoryMini extends Model<CategoryMini, CategMiniAttrs> {
    @ApiProperty({example:1, description:'Unikal Id'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    
    @ApiProperty({example:'Best seller', description:"Ichki category turi nomi"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    
    
    @ApiProperty({example:34, description:"Category soni"})
    @Column({
        type: DataType.INTEGER,
    })
    total: number;

   
  @HasMany(() => Books)
  book: Books[];
}
