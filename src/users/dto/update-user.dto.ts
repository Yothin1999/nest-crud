import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'ชื่อ',
        example: 'Yothin'
    })
    firstName: string;

    @ApiProperty({
        description: 'นามสกุล',
        example: 'Tangchanachaiphong'
    })
    lastName: string;


    @ApiProperty({
        description: 'สถานะการใช้งาน',
        example: true
    })
    isActive: boolean;
}
