import { UserEnum } from 'src/comon/enums/user-enum.enum';
import { BaseEntity } from 'src/modules/base/base.entity';
import { Column, CreateDateColumn, Entity, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['phone'])
export class User extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  otp: string;

  @CreateDateColumn()
  timeGenOTP: Date;

  @Column({ default: UserEnum.NOT_VERIFY })
  status: string;
}
