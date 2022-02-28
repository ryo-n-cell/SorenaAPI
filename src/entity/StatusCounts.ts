import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuestionTable } from "./QuestionTable";

@Index("question_id", ["questionId"], {})
@Entity("status_counts", { schema: "heroku_9f5b4b7870d65be" })
export class StatusCounts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "question_id" })
  questionId: number;

  @Column("tinyint", { name: "status" })
  status: number;

  @Column("timestamp", {
    name: "Created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(
    () => QuestionTable,
    (questionTable) => questionTable.statusCounts,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "question_id", referencedColumnName: "questionsId" }])
  question: QuestionTable;
}
