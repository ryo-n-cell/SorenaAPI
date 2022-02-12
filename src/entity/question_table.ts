import {Entity, PrimaryGeneratedColumn, Column,OneToMany, Timestamp} from "typeorm";

@Entity({ synchronize: false })
export class question_table {

    @PrimaryGeneratedColumn()
    questions_id: number;

    @Column()
    category_id: number;

    @Column()
    questions: string;
}
