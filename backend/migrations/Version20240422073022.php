<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240422073022 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'One to many migration for user/api_token';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE api_token DROP INDEX UNIQ_7BA2F5EBA76ED395, ADD INDEX IDX_7BA2F5EBA76ED395 (user_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE api_token DROP INDEX IDX_7BA2F5EBA76ED395, ADD UNIQUE INDEX UNIQ_7BA2F5EBA76ED395 (user_id)');
    }
}
