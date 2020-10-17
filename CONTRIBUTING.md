# Contributing to Open Online Testing Web

ยินดีต้อนรับเข้าสู่ Open Online Testing Web เนื้อหาส่วนนี้จะช่วยให้คุณเห็นภาพและเข้าใจว่าจะเข้ามามีส่วนร่วมกับโปรเจกต์นี้ได้อย่างไร ไปดูกัน

### สารบัญ

- [Code of Conduct](#code-of-conduct)
- [Development Steps](#development-steps)
- [Project structure](#project-structure)
- [Create New Page](#create-new-page)
- [Create New Component](#create-new-component)
- [Sending a Pull Request](#sending-a-pull-request)
- [Become a maintainer](#become-a-maintainer)

## Code of Conduct

Open Online Testing Service - API ได้นำ Code of Conduct จาก [Contributor Covenant](https://www.contributor-covenant.org/) มาปรับใช้ และเราคาดหวังว่าผู้ที่เข้ามาส่วนรวมกับโปรเจกต์จะยึดมั่นในสิ่งนี้
ดังนั้นการที่คุณอ่าน [code of conduct ที่ลิงก์นี้](/CODE_OF_CONDUCT.md) จะช่วยให้คุณเข้าใจว่าสิ่งไหนควรทำและสิ่งไหนที่ไม่

## Development Steps

หลังจากที่ทำการ Clone Project มา ให้เข้าไปยัง Directory ของ Project และใช้คำสั่งดังนี้

```sh
yarn install && yarn start
```

หลังจากรันตัวโปรเจคขึ้นมา จะสามารถเข้าดูเว็บไซต์ได้ที่ `localhost:3000`

## Project structure

```
open-online-testing-web
├── src
│   ├── ...
│   ├── api
│   ├── components
│   ├── constants
│   ├── elements
│   ├── fonts
│   ├── images
│   ├── libs
│   ├── pages
│   ├── services
│   └── tools
└── ...
```

- `api` ใช้ในการเก็บ api instance
- `components` ใช้ในการเก็บ Components ในระบบ
- `constants` ใช้ในการเก็บตัวแปรที่สามารถ Reuse ใช้กันได้ในส่วนอื่น ๆ ของโปรเจค
- `elements` ใช้ในการเก็บ Component เล็ก ๆ ที่สามารถ Reuse ใช้ได้ในหลาย ๆ ที่
- `fonts` เก็บไฟล์ font
- `images` เก็บไฟล์รูปภาพ
- `libs` เก็บ implementation ตัว library ที่นำมาใช้ หรือ library ที่เขียนเอง
- `pages` เก็บไฟล์ page ของเว็บไซต์
- `services` เก็บ api path ที่ backend service provide

## Create New Page

ในการสร้างหน้าใหม่ให้ทำการสร้างไฟล์ที่ `pages` directory จากนั้นทำการเพิ่ม path ใหม่ได้ที่ `App.js`

## Create New Component

พวกเราให้ความสำคัญกับ `(S)ingle Responsibility` ใน `S.O.L.I.D Principle` และ `(O)pen-Closed` ถ้ามีถือว่าดี ขอบคุณความรู้จาก Blog [Can you apply SOLID principles to your React applications ?](https://dev.to/shadid12/can-you-apply-solid-principles-to-your-react-applications-46il)

สำหรับ `Single Responsibility` พวกเราได้ออกแบบ Components เป็น 2 ส่วน คุณจะสังเกตได้จากไฟล์ `container.js` และ `index.js` ในแต่ละ directory ของ component นั้น ๆ

`container.js` มีหน้าที่ในการเก็บ Logic ของ component รวมถึงการเตรียมข้อมูล (ติดต่อกับ API) และ `index.js` ทำหน้าที่เป็นส่วน presentation จินตนาการว่าเป็น dump components ที่เราโยนข้อมูลบางอย่างเข้าไปเพื่อให้แสดงข้อมูลนั้นออกมา

## Commit Message Guideline

```
[type] <short summary>
 │       │
 │       │
 │       └─⫸ อธิบายให้อยู่ในรูปแบบ present tense ไม่ต้องมี capitalzed (ไม่ต้องมีตัวพิมพ์ใหญ่) ไม่ต้องมีจุดปิดท้าย (.)
 │
 └─⫸ ประเภทของ commit: [ADD]|[UPDATE][REMOVE]
```

**Type**
จะต้องอยู่ในรายการด้านล่าง ตัวใดตัวหนึ่ง

- [ADD] การเพิ่มไฟล์ หรือฟีเจอร์ใหม่
- [UPDATE] การแก้ไขไฟล์ แก้บั๊ก
- [REMOVE] การลบไฟล์ หรือลบโค้ดส่วนใดส่วนนึงออก

**Summary**

อธิบายการเปลี่ยนแปลงที่เกิดขึ้นใน commit นั้น ๆ อย่างรวบรัด ให้ได้ใจความว่าทำอะไร ทำไปทำไม

- ให้ใช้ประโยคอยู่ในรูปแบบของ present tense เช่น "change" ไม่ใช่ "changed" หรือ "changes"
- ต้องไม่เป็นตัวพิมพ์ใหญ่ขึ้นต้น (do not capitalized)
- ไม่ต้องมีจุดปิดท้าย (.)

### Commit Message Body

เป็นส่วนอธิบายรายละเอียดเพิ่มเติม ที่อาจเขียนจาก header ไม่หมด
ส่วนของรูปแบบประโยคให้เป็นในลักษณะเดียวกันกับ summary คือให้ใช้เป็น present tense: "fix" ไม่ใช่ "fixed" หรือ "fixes"

### Commit Message Footer

แปะ reference ของ GitHub issues, Jira ticket, หรือจากระบบอื่น ที่ commit นั้นเกี่ยวข้อง

```
[type]: <change summary>
<BLANK LINE>
<change description>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

## Sending a Pull Request

พวกเรายินดีต้อนรับ contributer ทุกคน คุณสามารถเริ่มต้นด้วยการโคลนโปรเจคจากนั้นทำการ สร้าง branch ขึ้นมาใหม่เพื่อพัฒนาจากนั้นทำการเปิด Pull request เข้า master branch

พวกเราไม่ได้ทำ Integration branch เช่น develop branch ดังนั้นโปรดมั่นใจว่าโค้ดของคุณสามารถทำงานได้และเทสผ่าน พวกเราจะช่วยคุณรีวิวโค้ด ก่อนทำการ merge เข้า master branch

## Become a maintainer

หลังจากที่คุณอ่านลงมาถึงจุดนี้ พวกเรามั่นใจว่าคุณพร้อมที่จะเป็น maintainer แล้ว

ถึงเวลาเริ่มต้นแล้ว! พัฒนาและทำการเปิด pull request เข้ามา ที่สำคัญอย่าลืมที่จะเพิ่มชื่อของคุณลงในไฟล์ `README.MD` ตรงส่วน `contributer`

**ขอให้โค้ดอย่างมีความสุข!**
