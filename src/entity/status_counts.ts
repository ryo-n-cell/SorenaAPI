import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Timestamp,
} from "typeorm";

@Entity({ synchronize: false })
export class status_counts {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  question_id: number = 0;

  @Column()
  status: number = 0;

  // @Column()
  // Created_at: Timestamp;
}
