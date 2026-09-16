// รอให้ DOM โหลดสมบูรณ์ก่อนทำงาน
window.onload = function () {
    const ftList = document.getElementById('ft_list');
    const newBtn = document.getElementById('new_btn');

    // โหลดข้อมูล TO DO จาก Cookie เมื่อเปิดหน้าเว็บ
    loadTodos();

    // Event Listener สำหรับปุ่ม New
    newBtn.addEventListener('click', function () {
        const todoText = prompt('Enter a new TO DO:');
        
        // ตรวจสอบว่ามีข้อมูล และไม่ได้เว้นว่างเปล่า (Trim แล้วไม่เป็นค่าว่าง)
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
            saveTodos();
        }
    });

    // ฟังก์ชันสร้างและเพิ่ม TO DO Element เข้าไปใน DOM
    function addTodo(text) {
        const todoDiv = document.createElement('div');
        todoDiv.textContent = text;

        // เมื่อคลิกที่รายการ TO DO ให้ถามยืนยันการลบ
        todoDiv.addEventListener('click', function () {
            if (confirm('Do you want to remove this to-do item?')) {
                todoDiv.remove(); // ลบออกจาก DOM
                saveTodos();      // อัปเดต Cookie
            }
        });

        // แทรกไว้ที่ "ด้านบนสุด" ของ ft_list (ตรงตามโจทย์: placed at the top of the list)
        ftList.insertBefore(todoDiv, ftList.firstChild);
    }

    // ฟังก์ชันบันทึกรายการทั้งหมดลงใน Cookie
    function saveTodos() {
        const todos = [];
        const items = ftList.children;
        
        // วนลูปเก็บข้อความของทุก div ใน ft_list
        // เนื่องจากเราใส่ insertBefore รายการใหม่จะอยู่บนสุด ดังนั้นเวลาวนเก็บควรจัดลำดับให้ถูกต้อง
        for (let i = items.length - 1; i >= 0; i--) {
            todos.push(items[i].textContent);
        }
        
        // แปลงเป็น JSON แล้วเข้ารหัส URI เผื่อมีตัวอักษรพิเศษหรือภาษาไทย
        const encodedData = encodeURIComponent(JSON.stringify(todos));
        // ตั้งค่า Cookie (กำหนด max-age ให้เก็บได้นาน เช่น 7 วัน)
        document.cookie = "ft_todo=" + encodedData + "; path=/; max-age=" + (7 * 24 * 60 * 60);
    }

    // ฟังก์ชันดึงข้อมูลจาก Cookie มาแสดงบนหน้าเว็บ
    function loadTodos() {
        const cookies = document.cookie.split(';');
        let todoCookie = "";

        for (let c of cookies) {
            c = c.trim();
            if (c.startsWith("ft_todo=")) {
                todoCookie = c.substring("ft_todo=".length);
                break;
            }
        }

        if (todoCookie) {
            try {
                const todos = JSON.parse(decodeURIComponent(todoCookie));
                if (Array.isArray(todos)) {
                    todos.forEach(function (text) {
                        addTodo(text);
                    });
                }
            } catch (e) {
                console.error("Error parsing todo cookie:", e);
            }
        }
    }
};