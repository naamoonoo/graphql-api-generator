import bcrypt from "bcrypt";
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { BCRYPT_ROUNDS } from "../types/constants";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: true, unique: true })
	fbId: string;

	@Column({ type: "text", nullable: true, unique: true })
	googleId: string;

	@Column({ type: "text" })
	username: string;

	@Column({ nullable: true })
	password: string;

	@Column({
		type: "text",
		nullable: false,
		default: "https://simpleicon.com/wp-content/uploads/user1.svg"
	})
	profilePhoto: string;

	@Column({ nullable: true, unique: true }) email: string;

	@Column({ default: false }) isEmailVerified: boolean;

	@Column({ nullable: true, unique: true }) phone: string;

	@Column({ default: false }) isPhoneVerified: boolean;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;

	public comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password);
			this.password = hashedPassword;
		}
	}

	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS);
	}
}
