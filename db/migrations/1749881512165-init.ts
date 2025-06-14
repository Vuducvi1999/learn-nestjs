import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749881512165 implements MigrationInterface {
    name = 'Init1749881512165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coffee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_0d92154f2ba671dd0d50709bb7f" UNIQUE ("name"), CONSTRAINT "PK_4d27239ee0b99a491ad806aec46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coffee_to_flavor" ("id" SERIAL NOT NULL, "coffeeId" integer, "flavorId" integer, CONSTRAINT "PK_cdb1d8ca7be74b49c613e6633e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flavor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_bce5a5c9651284fafcc234b163d" UNIQUE ("name"), CONSTRAINT "PK_934fe79b3d8131395c29a040ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coffee_to_flavor" ADD CONSTRAINT "FK_4b5274167a16aeed3a071194932" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coffee_to_flavor" ADD CONSTRAINT "FK_869e45890ded6cfeb89ea121041" FOREIGN KEY ("flavorId") REFERENCES "flavor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_to_flavor" DROP CONSTRAINT "FK_869e45890ded6cfeb89ea121041"`);
        await queryRunner.query(`ALTER TABLE "coffee_to_flavor" DROP CONSTRAINT "FK_4b5274167a16aeed3a071194932"`);
        await queryRunner.query(`DROP TABLE "flavor"`);
        await queryRunner.query(`DROP TABLE "coffee_to_flavor"`);
        await queryRunner.query(`DROP TABLE "coffee"`);
    }

}
