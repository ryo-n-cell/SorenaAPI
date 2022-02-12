import {Entity, PrimaryGeneratedColumn, Column,OneToMany, Timestamp} from "typeorm";

@Entity({ synchronize: false })
export class status_counts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question_id: number;

    @Column()
    status: number;

    // @Column()
    // Created_at: Timestamp;
}
