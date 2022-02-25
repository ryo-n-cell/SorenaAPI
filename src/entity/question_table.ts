import {Entity, PrimaryGeneratedColumn, Column,OneToMany, Timestamp} from "typeorm";
import {status_counts} from "./status_counts";

@Entity({ synchronize: false })
export class question_table {

    @PrimaryGeneratedColumn()
    questions_id: number;

    @Column()
    category_id: number;

    @Column()
    questions: string;

    @OneToMany(type => status_counts, results =>results.question_id)
    results: Array<status_counts>;
}
