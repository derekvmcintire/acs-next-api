-- CreateTable
CREATE TABLE "tblRider" (
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

    CONSTRAINT "tblRider_pkey" PRIMARY KEY ("id")
);
