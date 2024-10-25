/*
  Warnings:

  - You are about to drop the `tblRider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tblRider";

-- CreateTable
CREATE TABLE "Rider" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" TEXT,
    "country" TEXT,
    "hometown" TEXT,
    "photo" TEXT,
    "strava" TEXT,
    "insta" TEXT,
    "about" TEXT,

    CONSTRAINT "Rider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "raceTypeId" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "location" TEXT,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "url" TEXT,
    "description" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "disicpline" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "RaceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ResultType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoPlaceCodeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "NoPlaceCodeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "riderId" INTEGER NOT NULL,
    "resultTypeId" INTEGER NOT NULL,
    "noPlaceCodeTypeId" INTEGER NOT NULL,
    "lap" INTEGER,
    "place" INTEGER,
    "time" TEXT,
    "points" INTEGER,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinRiderCategory" (
    "id" SERIAL NOT NULL,
    "riderId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "JoinRiderCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinRiderTeam" (
    "id" SERIAL NOT NULL,
    "riderId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "JoinRiderTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_raceTypeId_fkey" FOREIGN KEY ("raceTypeId") REFERENCES "RaceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "ResultType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_noPlaceCodeTypeId_fkey" FOREIGN KEY ("noPlaceCodeTypeId") REFERENCES "NoPlaceCodeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRiderCategory" ADD CONSTRAINT "JoinRiderCategory_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRiderCategory" ADD CONSTRAINT "JoinRiderCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRiderTeam" ADD CONSTRAINT "JoinRiderTeam_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRiderTeam" ADD CONSTRAINT "JoinRiderTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
