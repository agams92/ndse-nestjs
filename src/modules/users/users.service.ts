import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User, UserEntity } from './users.model';

interface CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface UpdateUserDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserEntity>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(data: CreateUserDto): Promise<UserEntity> {
    const user = new this.UserModel(data);
    await user.save();
    return user;
  }

  public getById(id: string): Promise<UserEntity | undefined> {
    return this.UserModel.findById(id).exec();
  }

  public getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.UserModel.findOne({ email }).exec();
  }

  public update(
    id: string,
    newData: UpdateUserDto,
    options: { new: boolean },
  ): Promise<UserEntity> {
    return this.UserModel.findByIdAndUpdate(id, newData, options).exec();
  }

  public delete(id: string): Promise<{ ok?: number }> {
    return this.UserModel.deleteOne({ _id: id }).exec();
  }
}
