/*
  Warnings:

  - Added the required column `userId` to the `Memo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Memo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "cleatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Memo" ("cleatedAt", "completed", "id", "title", "updatedAt") SELECT "cleatedAt", "completed", "id", "title", "updatedAt" FROM "Memo";
DROP TABLE "Memo";
ALTER TABLE "new_Memo" RENAME TO "Memo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
