-- CreateEnum
CREATE TYPE "public"."UserTypes" AS ENUM ('HOME_OWNER', 'CONTRACTOR', 'PROJECT_MANAGER');

-- CreateEnum
CREATE TYPE "public"."BidStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."UserTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Bid" (
    "bidId" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "contractorId" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "public"."BidStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("bidId")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "projectId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "public"."Milestone" (
    "milestoneId" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("milestoneId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bid_projectId_contractorId_key" ON "public"."Bid"("projectId", "contractorId");

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
