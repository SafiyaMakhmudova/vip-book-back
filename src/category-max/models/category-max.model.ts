import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Books } from "../../books/models/book.model";


export enum Discount {
    '10%' = 10,
    '20%' = 20,
    '30%' = 30,
    '40%' = 40,
    '50%' = 50,
    '60%' = 60,
    '70%' = 70,
  }
  
  export enum Status {
    Book = 'Book',
    Canstavar = 'Canstavar'
  }


interface CategMaxAttrs {
    name: string;
    total: number;
    img:string;
    discount:Discount;
    status:Status;
}

@Table({tableName:'CategoryMax'})
export class CategoryMax extends Model<CategoryMax, CategMaxAttrs> {
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

    @ApiProperty({example:'book.png', description:"Kategory rasmi"})
    @Column({
        type: DataType.STRING,
    })
    img: string;


    @ApiProperty({
        example: 20,
        description: 'Discount percentage',
      })
      @Column({
        type: DataType.ENUM,
        values: ['10', '20', '30', '40', '50', '60' , '70' ],
        allowNull: true,
      })
      discount: Discount;
    
      @ApiProperty({
        example: 'Canstavar',
        description: 'The status of book',
      })
      @Column({
        type: DataType.ENUM,
        values: ['Book', 'Canstavar'],
        allowNull: false,
      })
      status: Status;
    
      
    
  @HasMany(() => Books)
  book: Books[]
}