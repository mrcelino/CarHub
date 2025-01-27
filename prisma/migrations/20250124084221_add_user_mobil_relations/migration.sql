-- AlterTable
ALTER TABLE `user` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Mobil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaKendaraan` VARCHAR(191) NOT NULL,
    `tipeKendaraan` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `lokasi` JSON NOT NULL,
    `transmisi` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mobil` ADD CONSTRAINT `Mobil_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
