import { MigrationInterface, QueryRunner } from "typeorm"

export class createTable1671757450476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE categories (
                id int NOT NULL AUTO_INCREMENT,
                title varchar(255) NOT NULL,
                slug varchar(255) NOT NULL,
                createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE articles (
                id int NOT NULL AUTO_INCREMENT,
                title varchar(255) NOT NULL,
                slug varchar(255) NOT NULL,
                body text NOT NULL,
                createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                categoryId int NULL, 
                CONSTRAINT categoryId FOREIGN KEY (categoryId) REFERENCES categories (id),
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE user (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                username varchar(255) NOT NULL,
                createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE articles DROP FOREIGN KEY categoryId;`);
        await queryRunner.query(`DROP TABLE user;`);
        await queryRunner.query(`DROP TABLE articles;`);
        await queryRunner.query(`DROP TABLE categories;`);
    }

}
