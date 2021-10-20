import {MigrationInterface, QueryRunner} from "typeorm";

export class FixingColoniaAndMunicipioUniqueColumn1634621954011 implements MigrationInterface {
    name = 'FixingColoniaAndMunicipioUniqueColumn1634621954011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_35537711b0196a91575003370d\` ON \`catcolonias\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa9c59d905bd4d65783f727995\` ON \`catmunicipios\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fa9c59d905bd4d65783f727995\` ON \`catmunicipios\` (\`nombre\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_35537711b0196a91575003370d\` ON \`catcolonias\` (\`nombre\`)`);
    }

}
