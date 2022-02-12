import {Entity, PrimaryGeneratedColumn, Column,OneToMany, Timestamp} from "typeorm";

@Entity({ synchronize: false })
export class count_logs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questions_id: number;

    @Column()
    yep_count: number;

    @Column()
    nope_count: number;

    // @Column()
    // Update_date: Timestamp;

    // @Column()
    // Created_at: Timestamp;
}
