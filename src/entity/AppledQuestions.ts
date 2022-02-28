import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoriesTable } from "./CategoriesTable";

@Index("category_id", ["categoryId"], {})
@Entity("appled_questions", { schema: "heroku_9f5b4b7870d65be" })
export class AppledQuestions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "category_id", nullable: true })
  categoryId: number | null;

  @Column("varchar", { name: "question", nullable: true, length: 255 })
  question: string | null;

  @Column("timestamp", { name: "Created_at", nullable: true })
  createdAt: Date | null;

  @ManyToOne(
    () => CategoriesTable,
    (categoriesTable) => categoriesTable.appledQuestions,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: CategoriesTable;
}
