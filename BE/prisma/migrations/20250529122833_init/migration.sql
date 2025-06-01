-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('KARYAWAN', 'SUPER_ADMIN') NOT NULL DEFAULT 'KARYAWAN',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `merk` VARCHAR(191) NOT NULL,
    `kodeProduk` VARCHAR(191) NOT NULL,
    `kategori` ENUM('OBAT_BEBAS', 'OBAT_KERAS', 'KONSI', 'ALKES') NOT NULL,
    `hargaModal` DOUBLE NOT NULL,
    `hargaJual` DOUBLE NOT NULL,
    `stok` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Produk_kodeProduk_key`(`kodeProduk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdukStokKadaluarsa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produkId` INTEGER NOT NULL,
    `stokAwal` INTEGER NOT NULL,
    `sisaStok` INTEGER NOT NULL,
    `tanggalExp` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdukMasuk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produkId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `hargaModal` DOUBLE NOT NULL,
    `tanggalMasuk` DATETIME(3) NOT NULL,
    `tanggalExp` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdukKeluar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produkId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `hargaModal` DOUBLE NOT NULL,
    `hargaJual` DOUBLE NOT NULL,
    `keuntungan` DOUBLE NOT NULL,
    `status` ENUM('TERJUAL', 'KADALUARSA', 'RUSAK', 'TIDAK_SESUAI') NOT NULL,
    `tanggalKeluar` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProdukStokKadaluarsa` ADD CONSTRAINT `ProdukStokKadaluarsa_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `Produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdukMasuk` ADD CONSTRAINT `ProdukMasuk_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `Produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdukMasuk` ADD CONSTRAINT `ProdukMasuk_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdukKeluar` ADD CONSTRAINT `ProdukKeluar_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `Produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdukKeluar` ADD CONSTRAINT `ProdukKeluar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
