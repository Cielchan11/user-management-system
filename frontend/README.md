# ระบบจัดการผู้ใช้งาน (User Management System)

## คุณสมบัติหลักที่พัฒนาแล้ว

* **การจัดการผู้ใช้งาน (CRUD Operations)**:
    * **GET /api/users**: ดึงข้อมูลผู้ใช้งานทั้งหมด
    * **POST /api/users**: สร้างผู้ใช้งานใหม่
    * **PUT /api/users/:id**: อัปเดตข้อมูลผู้ใช้งานที่มีอยู่
    * **DELETE /api/users/:id**: ลบผู้ใช้งาน
* **UI สำหรับจัดการผู้ใช้งาน**:
    * แสดงรายการผู้ใช้งาน
    * ฟอร์มสำหรับเพิ่มและแก้ไขผู้ใช้งาน
    * หน้าจอรองรับการแสดงผลทั้งบนเดสก์ท็อปและมือถือ
* **การค้นหาและกรองข้อมูล**:
    * ค้นหาผู้ใช้งานตามชื่อหรืออีเมล
    * กรองผู้ใช้งานตาม Role (บทบาท)
* **ระบบแจ้งเตือน (Toast Notifications)**: แสดงข้อความแจ้งเตือนสถานะต่างๆ (เช่น ความสำเร็จ, ข้อผิดพลาด)
* **โครงสร้างโปรเจกต์ที่เป็นระเบียบ**: แบ่ง Frontend และ Backend แยกกันเพื่อความง่ายในการจัดการ

## 🛠️ เทคโนโลยีที่ใช้

* **Frontend**:
    * **Next.js**
    * **React**
    * **Tailwind CSS**
    * **Mantine** (สำหรับ UI components บางส่วน)
    * **react-hook-form** (สำหรับจัดการฟอร์ม)
    * **Zod** (สำหรับ Schema validation)
* **Backend**:
    * **Node.js**
    * **Express.js**
    * **TypeScript**
    * **Prisma ORM**
    * **SQLite** (ฐานข้อมูลหลักที่ใช้ในโปรเจกต์นี้)
    * **CORS**
    * **Dotenv**

## 🚀 การติดตั้งและเรียกใช้งาน

โปรดตรวจสอบให้แน่ใจว่าได้ติดตั้ง Node.js (v18 หรือสูงกว่า) และ Git 

### 1. โคลน Repository

```bash
git clone [https://github.com/Cielchan11/user-management-system.git](https://github.com/Cielchan11/user-management-system.git)
cd user-management-system

2. การติดตั้งและตั้งค่าในส่วน Backend
cd backend

# ติดตั้ง dependencies ที่จำเป็น
npm install

# ตั้งค่า Prisma และสร้างฐานข้อมูล
npx prisma generate # สร้าง Prisma Client
npx prisma db push  # สร้าง Schema ฐานข้อมูล (ไฟล์ development.db จะถูกสร้างขึ้น)

ภายในไฟล์ .env ในโฟลเดอร์ backend ให้เพิ่ม
PORT=3001
DATABASE_URL="file:./development.db"

3. ติดตั้งและตั้งค่า Frontend
cd frontend

npm install
และ .env ให้เพิ่ม
NEXT_PUBLIC_API_URL=http://localhost:3001

4. การเรียกใช้งานระบบ
จะแบ่่ง Terminal เป็น Frontend และ Backend

Frontend

cd frontend
npm run dev

Backend

cd backend
npm run dev

