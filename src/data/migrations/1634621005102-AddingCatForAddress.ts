import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingCatForAddress1634621005102 implements MigrationInterface {
    name = 'AddingCatForAddress1634621005102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`catpaises\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`descripcion\` varchar(255) NULL, UNIQUE INDEX \`IDX_04fc0d9582d421dd53cf3496de\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`catcolonias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`descripcion\` varchar(255) NULL, \`codigoPostal\` varchar(5) NOT NULL, \`municipioId\` int NOT NULL, UNIQUE INDEX \`IDX_35537711b0196a91575003370d\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`catmunicipios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`descripcion\` varchar(255) NULL, \`estadoId\` int NOT NULL, UNIQUE INDEX \`IDX_fa9c59d905bd4d65783f727995\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`catestados\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`descripcion\` varchar(255) NULL, \`paisId\` int NOT NULL, UNIQUE INDEX \`IDX_87e03a045e80b608861e166085\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`municipio\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`localidad\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`codigoPostal\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`estadoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`municipioId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`coloniaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`catcolonias\` ADD CONSTRAINT \`FK_b3e15d67ffb0a94742956f02c53\` FOREIGN KEY (\`municipioId\`) REFERENCES \`catmunicipios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`catmunicipios\` ADD CONSTRAINT \`FK_eaec5bcefc4cc9324739be89914\` FOREIGN KEY (\`estadoId\`) REFERENCES \`catestados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`catestados\` ADD CONSTRAINT \`FK_50c294b99bd2d24e5e8c5019557\` FOREIGN KEY (\`paisId\`) REFERENCES \`catpaises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD CONSTRAINT \`FK_26367e75b935a7ba15ca0ee8afa\` FOREIGN KEY (\`estadoId\`) REFERENCES \`catestados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD CONSTRAINT \`FK_1b9c748aea4593d171d6c30ff4e\` FOREIGN KEY (\`municipioId\`) REFERENCES \`catmunicipios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD CONSTRAINT \`FK_9c3b20daddff7aefb4db1c5c954\` FOREIGN KEY (\`coloniaId\`) REFERENCES \`catcolonias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP FOREIGN KEY \`FK_9c3b20daddff7aefb4db1c5c954\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP FOREIGN KEY \`FK_1b9c748aea4593d171d6c30ff4e\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP FOREIGN KEY \`FK_26367e75b935a7ba15ca0ee8afa\``);
        await queryRunner.query(`ALTER TABLE \`catestados\` DROP FOREIGN KEY \`FK_50c294b99bd2d24e5e8c5019557\``);
        await queryRunner.query(`ALTER TABLE \`catmunicipios\` DROP FOREIGN KEY \`FK_eaec5bcefc4cc9324739be89914\``);
        await queryRunner.query(`ALTER TABLE \`catcolonias\` DROP FOREIGN KEY \`FK_b3e15d67ffb0a94742956f02c53\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`coloniaId\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`municipioId\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` DROP COLUMN \`estadoId\``);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`codigoPostal\` varchar(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`localidad\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`municipio\` varchar(90) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direcciones\` ADD \`estado\` varchar(50) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_87e03a045e80b608861e166085\` ON \`catestados\``);
        await queryRunner.query(`DROP TABLE \`catestados\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa9c59d905bd4d65783f727995\` ON \`catmunicipios\``);
        await queryRunner.query(`DROP TABLE \`catmunicipios\``);
        await queryRunner.query(`DROP INDEX \`IDX_35537711b0196a91575003370d\` ON \`catcolonias\``);
        await queryRunner.query(`DROP TABLE \`catcolonias\``);
        await queryRunner.query(`DROP INDEX \`IDX_04fc0d9582d421dd53cf3496de\` ON \`catpaises\``);
        await queryRunner.query(`DROP TABLE \`catpaises\``);
    }

}
