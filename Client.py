import socket
import pickle

sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sk.connect((socket.gethostname(), 1125))
# socket.gethostname because the data is being send and received on the same machine

while True:
    msg = sk.recv(1024)  # this is the buffer, 1024 is the size of the data chunk
    print(msg.decode('utf-8'))
    search = True
    newStudent = True
    while True:
        if msg.decode('utf-8') == 'Kết nối server thành công':
            student_id = input(f"Nhập MSSV: ")
            sk.send(bytes(student_id, 'utf-8'))
            new_msg = sk.recv(1024)
            decoded_msg = pickle.loads(new_msg)
            print(decoded_msg)
            newStudent = False
