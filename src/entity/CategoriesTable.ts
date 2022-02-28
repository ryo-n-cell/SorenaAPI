import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppledQuestions } from "./AppledQuestions";

@Entity("categories_table", { schema: "heroku_9f5b4b7870d65be" })
export class CategoriesTable {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id" })
  categoryId: number;

  @Column("varchar", { name: "category_name", nullable: true, length: 255 })
  categoryName: string | null;

  @Column("timestamp", { name: "Created_at", nullable: true })
  createdAt: Date | null;

  @OneToMany(
    () => AppledQuestions,
    (appledQuestions) => appledQuestions.category
  )
  appledQuestions: AppledQuestions[];
}
