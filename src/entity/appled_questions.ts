import {Entity, PrimaryGeneratedColumn, Column,OneToMany, Timestamp} from "typeorm";

@Entity({ synchronize: false })
export class appled_questions {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number;

    @Column()
    question: string;

    // @Column()
    // Created_at: Timestamp;
}
