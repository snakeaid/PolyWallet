import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity()
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column({
    transformer: new EncryptionTransformer({
      key: process.env.ENCRYPTION_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: process.env.ENCRYPTION_IV,
    }),
  })
  public password: string;
}
