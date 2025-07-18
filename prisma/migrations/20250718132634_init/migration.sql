-- CreateTable
CREATE TABLE "User" (
    "IdUser" SERIAL NOT NULL,
    "Username" VARCHAR(50) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,
    "PasswordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser")
);

-- CreateTable
CREATE TABLE "Project" (
    "IdProject" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Goal" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("IdProject")
);

-- CreateTable
CREATE TABLE "Note" (
    "IdNote" SERIAL NOT NULL,
    "Content" TEXT NOT NULL,
    "ReviewDate" TIMESTAMP(3),
    "Tags" TEXT,
    "IdUser" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("IdNote")
);

-- CreateTable
CREATE TABLE "Task" (
    "IdTask" SERIAL NOT NULL,
    "Title" VARCHAR(100) NOT NULL,
    "Description" TEXT,
    "DueDate" TIMESTAMP(3),
    "Status" TEXT NOT NULL DEFAULT 'pending',
    "Context" TEXT,
    "IdProject" INTEGER,
    "IdNote" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("IdTask")
);

-- CreateTable
CREATE TABLE "Inbox" (
    "IdInboxItem" SERIAL NOT NULL,
    "Content" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IdUser" INTEGER NOT NULL,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("IdInboxItem")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_IdProject_fkey" FOREIGN KEY ("IdProject") REFERENCES "Project"("IdProject") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_IdNote_fkey" FOREIGN KEY ("IdNote") REFERENCES "Note"("IdNote") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;
