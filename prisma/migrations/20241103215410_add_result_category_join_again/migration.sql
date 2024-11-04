-- CreateTable
CREATE TABLE "JoinResultCategory" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "JoinResultCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JoinResultCategory" ADD CONSTRAINT "JoinResultCategory_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinResultCategory" ADD CONSTRAINT "JoinResultCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
