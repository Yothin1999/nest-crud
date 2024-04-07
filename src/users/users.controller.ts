import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ description: 'เพิ่มข้อมูลสำเร็จ' })
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const CreateData = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        Message: 'เพิ่มข้อมูลสำเร็จ',
        data: CreateData
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        StatusCode: HttpStatus.BAD_REQUEST,
        status: false,
        Message: "Error !!"
      });
    }
  }

  @Get()
  @ApiOkResponse({ status: 200, description: 'แสดงข้อมูลทั้งหมด' })
  async findAll(@Res() response) {
    try {
      const UserData = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        Message: 'แสดงข้อมูลทั้งหมด',
        UserData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: "Server Error"
      });
    }
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'แสดงข้อมูลเดียว' })
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const UserData = await this.usersService.findOne(+id);
      if (!UserData) {
        return response.status(HttpStatus.NOT_FOUND).json({
          StatusCode: HttpStatus.NOT_FOUND,
          message: 'ไม่พบข้อมูล',
          UserData,
        });
      }
      return response.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        message: 'พบข้อมูล',
        UserData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: "Server Error"
      });
    }
  }

  @Patch(':id')
  @ApiOkResponse({ status: 200, description: 'แก้ไขข้อมูลสำเร็จ' })
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const EditData = await this.usersService.update(+id, updateUserDto);
      if (!EditData) {
        return response.status(HttpStatus.NOT_FOUND).json({
          StatusCode: HttpStatus.NOT_FOUND,
          message: 'ไม่พบข้อมูลที่จะแก้ไข',
          EditData,
        })
      }
      return response.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        Message: 'แก้ไขข้อมูลสำเร็จ',
        EditData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: "Server Error"
      });
    }
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'ลบข้อมูลสำเร็จ' })
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const DelData = await this.usersService.remove(+id);
      if (!DelData) {
        return response.status(HttpStatus.NOT_FOUND).json({
          StatusCode: HttpStatus.NOT_FOUND,
          Message: 'ไม่พบข้อมูลที่ต้องการลบ',
          DelData,
        })
      }
      return response.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        Message: 'ลบข้อมูลสำเร็จ',
        DelData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: "Server Error"
      });
    }
  }
}
