import socket

sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sk.connect((socket.gethostname(), 1125))

while True:
    msg = sk.recv(1024)
    print(msg.decode('utf-8'))
    search = True
    newStudent = True

    while True:
        if msg.decode('utf-8') == 'Kết nối server thành công':
            student_id = input(f"Nhập MSSV: ")
            sk.send(bytes(student_id, 'utf-8'))
            new_msg = sk.recv(1024)
            print(new_msg.decode('utf-8'))
            newStudent = False
