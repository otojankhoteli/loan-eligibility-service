import {
    Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity('loans')
export class Loan {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ type: 'varchar', length: 255 })
        applicantName: string;

    @Column({ type: 'int' })
        creditScore: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
        monthlyIncome: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
        requestedAmount: number;

    @Column({ type: 'int' })
        loanTermMonths: number;

    @Column({ type: 'boolean' })
        eligible: boolean;

    @Column({ type: 'varchar' })
        reason: string;

    @CreateDateColumn()
        createdAt: Date;

    @UpdateDateColumn()
        updatedAt: Date;
}
