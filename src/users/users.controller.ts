import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ description: 'เพิ่มข้อมูลสำเร็จ' })
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try{
      const CreateData = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        StatusCode : HttpStatus.OK,
        message:'เพิ่มข้อมูลสำเร็จ',
        data : CreateData
      });
    }catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status : false ,
        message : "Error !!"
      });
    }
  }

  @Get()
  @ApiOkResponse({ status: 200, description: 'แสดงข้อมูลทั้งหมด' })
  async findAll(@Res() response) {
    try {
      const UserData = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        StatusCode : HttpStatus.OK,
        message: 'แสดงข้อมูลทั้งหมด', 
        UserData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode : HttpStatus.BAD_GATEWAY,
        Message: "Server Error"
      });
    }
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'แสดงข้อมูลเดียว' })
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const UserData = await this.usersService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        StatusCode : HttpStatus.OK,
        message: 'แสดงข้อมูลเดียว', 
        UserData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode : HttpStatus.BAD_GATEWAY,
        Message: "Server Error"
      });
    }
  }

  @Patch(':id')
  @ApiOkResponse({ status: 200, description: 'แก้ไขข้อมูลสำเร็จ' })
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const EditData = await this.usersService.update(+id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        StatusCode : HttpStatus.OK,
        message: 'แก้ไขข้อมูลสำเร็จ', 
        EditData,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode : HttpStatus.BAD_GATEWAY,
        Message: "Server Error"
      });
    }
  }

  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'ลบข้อมูลสำเร็จ' })
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const DelData = await this.usersService.remove(+id);
      return response.status(HttpStatus.OK).json({
        StatusCode : HttpStatus.OK,
        message: 'ลบข้อมูลสำเร็จ'
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        StatusCode : HttpStatus.BAD_GATEWAY,
        Message: "Server Error"
      });
    }
  }
}
