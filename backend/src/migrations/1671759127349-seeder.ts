import { MigrationInterface, QueryRunner } from "typeorm"
import { seed } from "../seeder/1671759127349-basicSeeder"

export class seeder1671759127349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await seed(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE from articles;`);
        await queryRunner.query(`DELETE from categories;`);
        await queryRunner.query(`DELETE from user;`);
    }

}
