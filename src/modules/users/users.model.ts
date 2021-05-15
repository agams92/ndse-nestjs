import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
type UserEntity = User & Document;

@Schema()
class User {
  @Prop({ required: true, unique: true, dropDups: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ default: '' })
  public firstName: string;

  @Prop({ default: '' })
  public lastName: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserEntity, User, UserSchema };
