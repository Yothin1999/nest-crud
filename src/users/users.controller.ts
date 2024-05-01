import { Controller, Get, Post, Body, Patch, Put, Param, Delete, HttpStatus, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, 
  ApiBody, 
  ApiCreatedResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiTags 
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ description: 'เพิ่มข้อมูลสำเร็จ' })
  @ApiBadRequestResponse({ description: 'มีอีเมลซ้ำไม่สามารถเพิ่มข้อมูลได้' })
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const CreateData = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'เพิ่มข้อมูลสำเร็จ',
      data: CreateData
    });
  }
  @Post('more')
  @ApiCreatedResponse({ description: 'เพิ่มข้อมูลสำเร็จ' })
  @ApiBadRequestResponse({ description: 'มีอีเมลซ้ำไม่สามารถเพิ่มข้อมูลได้' })
  @ApiBody({ type: [CreateUserDto] })
  async createall(@Res() response, @Body() createUserDto: CreateUserDto[]) {
    const CreateData = await this.usersService.createall(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'เพิ่มข้อมูลสำเร็จ',
      data: CreateData
    });
  }

  @Get('all')
  @ApiOkResponse({ description: 'แสดงข้อมูลทั้งหมด' })
  async findAll(@Res() response) {
    const UserData = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'แสดงข้อมูลทั้งหมด',
      UserData,
    });
  }

  @Get('allsql')
  @ApiOkResponse({ description: 'แสดงข้อมูลทั้งหมด' })
  async findAllSQL(@Res() response) {
    const UserData = await this.usersService.findAllSQL();
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'แสดงข้อมูลทั้งหมด',
      UserData,
    });
  }

  @Get(':id')
  @ApiOkResponse({ description: 'แสดงข้อมูลเดียว' })
  @ApiNotFoundResponse({description: 'ไม่พบข้อมูล' })
  async findOne(@Res() response, @Param('id') id: string) {
    const UserData = await this.usersService.findOne(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'พบข้อมูล',
      UserData,
    })
  }

  @Get('allfield/:id')
  @ApiOkResponse({ description: 'แสดงข้อมูลเดียว' })
  @ApiNotFoundResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  async findOneby(@Res() response, @Param('id') id: string) {
    const UserData = await this.usersService.findOneby(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'พบข้อมูล',
      UserData,
    })
  }

  // @Patch(':id')
  @Put(':id')
  @ApiOkResponse({ description: 'แก้ไขข้อมูลสำเร็จ' })
  @ApiNotFoundResponse({ description: 'ไม่สามารถอัปเดตข้อมูลได้ เนื่องจากไม่พบข้อมูล' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const EditData = await this.usersService.update(id, updateUserDto);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      Message: 'แก้ไขข้อมูลสำเร็จ',
      EditData,
    })
  }
  @Delete(':id')
  @ApiOkResponse({ description: 'ลบข้อมูลสำเร็จ' })
  @ApiNotFoundResponse({ description: 'ไม่สามารถลบข้อมูลได้ เนื่องจากไม่พบข้อมูล' })
  async remove(@Res() response, @Param('id') id: string) {
    const DelData = await this.usersService.remove(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      Message: 'ลบข้อมูลสำเร็จ',
      DelData,
    });
  }
}
