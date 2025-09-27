/*
  Warnings:

  - Added the required column `receiver_id` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` ADD COLUMN `receiver_id` INTEGER NOT NULL,
    ADD COLUMN `sender_id` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(255) NOT NULL DEFAULT 'unread';

-- CreateIndex
CREATE INDEX `sender_id` ON `message`(`sender_id`);

-- CreateIndex
CREATE INDEX `receiver_id` ON `message`(`receiver_id`);

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
