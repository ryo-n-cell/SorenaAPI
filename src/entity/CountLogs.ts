import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuestionTable } from "./QuestionTable";

@Index("questions_id", ["questionsId"], {})
@Entity("count_logs", { schema: "heroku_9f5b4b7870d65be" })
export class CountLogs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "questions_id", nullable: true })
  questionsId: number | null;

  @Column("int", { name: "yep_count", nullable: true })
  yepCount: number | null;

  @Column("int", { name: "nope_count", nullable: true })
  nopeCount: number | null;

  @Column("int", { name: "Update_date", nullable: true })
  updateDate: number | null;

  @Column("int", { name: "Created_date", nullable: true })
  createdDate: number | null;

  @ManyToOne(() => QuestionTable, (questionTable) => questionTable.countLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "questions_id", referencedColumnName: "questionsId" }])
  questions: QuestionTable;
}
