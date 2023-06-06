import { UserEnum } from 'src/comon/enums/user-enum.enum';
import { BaseEntity } from 'src/modules/base/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['phone'])
export class User extends BaseEntity {
  @Column()
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: UserEnum.NOT_VERIFY })
  status: string;
}
