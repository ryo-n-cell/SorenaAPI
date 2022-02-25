import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from "typeorm";

import {question_table} from "./question_table";

@Entity({ synchronize: false })
export class status_counts {
  @PrimaryGeneratedColumn('increment')
  id: number = 0;

  @Column()
  question_id: number = 0;

  @Column()
  status: number = 0;

  @ManyToOne(type => question_table, Question_table => Question_table.results)
  @JoinColumn({ name: 'question_id' })
  Question_table: question_table;

  // @Column()
  // Created_at: Timestamp;
}
