import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1634538409259 implements MigrationInterface {
    name = 'FirstMigration1634538409259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`medicamentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`precio\` float NOT NULL, \`stock\` int NOT NULL, \`descuento\` float NOT NULL, \`caducidad\` datetime NOT NULL, \`imagen\` text NULL, UNIQUE INDEX \`IDX_60a554286fb059007fa5cd3406\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`detalles-ordenes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidad\` int NOT NULL, \`ordenId\` int NOT NULL, \`medicamentoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ordenes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`hora\` time NOT NULL, \`total\` float NOT NULL, \`tipoPago\` enum ('CC', 'Efectivo') NOT NULL, \`usuarioId\` int NOT NULL, \`repartidorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`repartidores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(30) NOT NULL, \`apellidoPaterno\` varchar(30) NOT NULL, \`apellidoMaterno\` varchar(30) NULL, \`rfc\` varchar(13) NOT NULL, \`curp\` varchar(18) NOT NULL, \`edad\` int NOT NULL, \`telefono\` varchar(10) NOT NULL, \`correoElectronico\` varchar(150) NOT NULL, \`username\` varchar(80) NOT NULL, \`contrasena\` varchar(255) NOT NULL, \`direccionId\` int NOT NULL, \`rolId\` int NOT NULL, UNIQUE INDEX \`IDX_19cd043d269f943bf9237ae06b\` (\`rfc\`), UNIQUE INDEX \`IDX_65f7ff742acb1e104aee8876f2\` (\`curp\`), UNIQUE INDEX \`IDX_86299ff848ab805553a93ea3c6\` (\`correoElectronico\`), UNIQUE INDEX \`IDX_5b0cbfca0f3a40b886db66afa1\` (\`username\`), UNIQUE INDEX \`REL_af7ffbaf07e9bc973babd4d641\` (\`direccionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(50) NOT NULL, \`descripcion\` varchar(200) NULL, UNIQUE INDEX \`IDX_a5be7aa67e759e347b1c6464e1\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`farmacias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`rfc\` varchar(13) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`correoElectronico\` varchar(150) NOT NULL, \`username\` varchar(80) NOT NULL, \`contrasena\` varchar(255) NOT NULL, \`telefono\` varchar(10) NOT NULL, \`rolId\` int NOT NULL, \`direccionId\` int NOT NULL, UNIQUE INDEX \`IDX_de060308598fa3dbed286ed1ed\` (\`nombre\`), UNIQUE INDEX \`IDX_bf3f5fe4e693847d9d80d1c870\` (\`rfc\`), UNIQUE INDEX \`IDX_c3eb09459385e662726d6d89f9\` (\`correoElectronico\`), UNIQUE INDEX \`IDX_3536a2f2e3086632c043cbbcfb\` (\`username\`), UNIQUE INDEX \`REL_8661933fa5800425d21a5a5a9b\` (\`direccionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`direcciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`estado\` varchar(50) NOT NULL, \`municipio\` varchar(90) NOT NULL, \`localidad\` varchar(150) NOT NULL, \`codigoPostal\` varchar(5) NOT NULL, \`calle\` varchar(150) NOT NULL, \`numeroInterior\` int NULL, \`numeroExterior\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(30) NOT NULL, \`apellidoPaterno\` varchar(30) NOT NULL, \`apellidoMaterno\` varchar(30) NULL, \`correoElectronico\` varchar(150) NOT NULL, \`username\` varchar(80) NOT NULL, \`contrasena\` varchar(255) NOT NULL, \`telefono\` varchar(10) NOT NULL, \`direccionId\` int NOT NULL, \`rolId\` int NOT NULL, UNIQUE INDEX \`IDX_d5ba0870256945c08f3965e0fb\` (\`correoElectronico\`), UNIQUE INDEX \`IDX_9f78cfde576fc28f279e2b7a9c\` (\`username\`), UNIQUE INDEX \`REL_5f4bda7b22bcd839e4c6654adf\` (\`direccionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carritos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidad\` int NOT NULL, \`usuarioId\` int NOT NULL, \`medicamentoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`detalles-ordenes\` ADD CONSTRAINT \`FK_280f0a900c4484b7a5d0bb6d963\` FOREIGN KEY (\`ordenId\`) REFERENCES \`ordenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles-ordenes\` ADD CONSTRAINT \`FK_659bdcc1fe4ca1905cdbf953fb0\` FOREIGN KEY (\`medicamentoId\`) REFERENCES \`medicamentos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordenes\` ADD CONSTRAINT \`FK_165e942b0dc78714d7fb6924efd\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordenes\` ADD CONSTRAINT \`FK_0b28173f723c98438a0f2420ce8\` FOREIGN KEY (\`repartidorId\`) REFERENCES \`repartidores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`repartidores\` ADD CONSTRAINT \`FK_af7ffbaf07e9bc973babd4d6416\` FOREIGN KEY (\`direccionId\`) REFERENCES \`direcciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`repartidores\` ADD CONSTRAINT \`FK_c108e6e3d2113e540d375d299f7\` FOREIGN KEY (\`rolId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`farmacias\` ADD CONSTRAINT \`FK_692fe64a8052f315630ac434035\` FOREIGN KEY (\`rolId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`farmacias\` ADD CONSTRAINT \`FK_8661933fa5800425d21a5a5a9b7\` FOREIGN KEY (\`direccionId\`) REFERENCES \`direcciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_5f4bda7b22bcd839e4c6654adf9\` FOREIGN KEY (\`direccionId\`) REFERENCES \`direcciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_df0c94be5a01a546bf1b9ca12ae\` FOREIGN KEY (\`rolId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carritos\` ADD CONSTRAINT \`FK_c666f33a5fe33598e6926f93b2c\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carritos\` ADD CONSTRAINT \`FK_d8b109ce8ab77ebd92851d5e37f\` FOREIGN KEY (\`medicamentoId\`) REFERENCES \`medicamentos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`carritos\` DROP FOREIGN KEY \`FK_d8b109ce8ab77ebd92851d5e37f\``);
        await queryRunner.query(`ALTER TABLE \`carritos\` DROP FOREIGN KEY \`FK_c666f33a5fe33598e6926f93b2c\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_df0c94be5a01a546bf1b9ca12ae\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_5f4bda7b22bcd839e4c6654adf9\``);
        await queryRunner.query(`ALTER TABLE \`farmacias\` DROP FOREIGN KEY \`FK_8661933fa5800425d21a5a5a9b7\``);
        await queryRunner.query(`ALTER TABLE \`farmacias\` DROP FOREIGN KEY \`FK_692fe64a8052f315630ac434035\``);
        await queryRunner.query(`ALTER TABLE \`repartidores\` DROP FOREIGN KEY \`FK_c108e6e3d2113e540d375d299f7\``);
        await queryRunner.query(`ALTER TABLE \`repartidores\` DROP FOREIGN KEY \`FK_af7ffbaf07e9bc973babd4d6416\``);
        await queryRunner.query(`ALTER TABLE \`ordenes\` DROP FOREIGN KEY \`FK_0b28173f723c98438a0f2420ce8\``);
        await queryRunner.query(`ALTER TABLE \`ordenes\` DROP FOREIGN KEY \`FK_165e942b0dc78714d7fb6924efd\``);
        await queryRunner.query(`ALTER TABLE \`detalles-ordenes\` DROP FOREIGN KEY \`FK_659bdcc1fe4ca1905cdbf953fb0\``);
        await queryRunner.query(`ALTER TABLE \`detalles-ordenes\` DROP FOREIGN KEY \`FK_280f0a900c4484b7a5d0bb6d963\``);
        await queryRunner.query(`DROP TABLE \`carritos\``);
        await queryRunner.query(`DROP INDEX \`REL_5f4bda7b22bcd839e4c6654adf\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f78cfde576fc28f279e2b7a9c\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_d5ba0870256945c08f3965e0fb\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`direcciones\``);
        await queryRunner.query(`DROP INDEX \`REL_8661933fa5800425d21a5a5a9b\` ON \`farmacias\``);
        await queryRunner.query(`DROP INDEX \`IDX_3536a2f2e3086632c043cbbcfb\` ON \`farmacias\``);
        await queryRunner.query(`DROP INDEX \`IDX_c3eb09459385e662726d6d89f9\` ON \`farmacias\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf3f5fe4e693847d9d80d1c870\` ON \`farmacias\``);
        await queryRunner.query(`DROP INDEX \`IDX_de060308598fa3dbed286ed1ed\` ON \`farmacias\``);
        await queryRunner.query(`DROP TABLE \`farmacias\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5be7aa67e759e347b1c6464e1\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`REL_af7ffbaf07e9bc973babd4d641\` ON \`repartidores\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b0cbfca0f3a40b886db66afa1\` ON \`repartidores\``);
        await queryRunner.query(`DROP INDEX \`IDX_86299ff848ab805553a93ea3c6\` ON \`repartidores\``);
        await queryRunner.query(`DROP INDEX \`IDX_65f7ff742acb1e104aee8876f2\` ON \`repartidores\``);
        await queryRunner.query(`DROP INDEX \`IDX_19cd043d269f943bf9237ae06b\` ON \`repartidores\``);
        await queryRunner.query(`DROP TABLE \`repartidores\``);
        await queryRunner.query(`DROP TABLE \`ordenes\``);
        await queryRunner.query(`DROP TABLE \`detalles-ordenes\``);
        await queryRunner.query(`DROP INDEX \`IDX_60a554286fb059007fa5cd3406\` ON \`medicamentos\``);
        await queryRunner.query(`DROP TABLE \`medicamentos\``);
    }

}
