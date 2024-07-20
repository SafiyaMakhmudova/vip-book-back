import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  SUPERADMIN = 'SuperAdmin',
  ADMIN = 'Admin',
}

interface AdminAttrs {
  full_name: string;
  password: string;
  login:string;
  phone_number:string;
  address: string;
  is_active: boolean;
  role: Role;
  hashed_refresh_token: string;
}

@Table({ tableName: 'Admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Adam', description: 'Admin ismi' })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({ example: 'Hello', description: 'Admin login' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  login: string;

  
  @ApiProperty({ example: '+998901112233', description: 'Admin telefon raqami' })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;


  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin paroli' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: 'chilonzor', description: 'Admin manzili' })
  @Column({
    type: DataType.STRING,
  })
  address: string;


  @ApiProperty({
    example: 'Admin',
    description: "Admin super adminmi yoki yo'q",
  })
  @Column({
    type: DataType.ENUM,
    values: ['SuperAdmin', 'Admin'],
    defaultValue: Role.ADMIN,
  })
  role: Role;

  @ApiProperty({ example: 'false', description: 'Admin activligi' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'dsf7787cvnc9s_kjsjfndf7',
    description: 'Admin hashed refresh tokeni',
  })
  @Column({
    type: DataType.STRING,
    defaultValue:''
  })
  hashed_refresh_token: string;
}
