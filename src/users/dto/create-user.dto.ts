import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    
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
        description: 'อีเมล',
        example: 'test@test.com'
    })
    email: string;

    @ApiProperty({
        description: 'สถานะการใช้งาน',
        example: true
    })
    isActive: boolean;
}
