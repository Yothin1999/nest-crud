import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    id: number;

    @ApiProperty({
        description: 'ชื่อ',
        example : 'Yothin'
    })
    firstName: string;
    @ApiProperty({
        description: 'นามสกุล',
        example : 'Tangchanachaiphong'
    })
    lastName: string;

    @ApiProperty({
        description: 'True || False',
        example : 'True'
    })
    isActive: boolean;
}
