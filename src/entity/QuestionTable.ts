import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CountLogs } from "./CountLogs";
import { StatusCounts } from "./StatusCounts";

@Entity("question_table", { schema: "heroku_9f5b4b7870d65be" })
export class QuestionTable {
  @PrimaryGeneratedColumn({ type: "int", name: "questions_id" })
  questionsId: number;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @Column("varchar", { name: "questions", length: 255 })
  questions: string;

  @OneToMany(() => CountLogs, (countLogs) => countLogs.questions)
  countLogs: CountLogs[];

  @OneToMany(() => StatusCounts, (statusCounts) => statusCounts.question)
  statusCounts: StatusCounts[];
}
