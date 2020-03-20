import socket
import pickle
sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sk.connect((socket.gethostname(), 1024))

while True:
    message_rcv = sk.recv(1024)
    print(message_rcv.decode('utf-8'))
    student_info = {
        'MSSV': 17021300,
        'Họ Tên': 'Nguyễn Ngọc Minh'
    }
    sk.send(pickle.dumps(student_info))
