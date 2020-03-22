import socket
from StudentList import student_list
import pickle

# creates a socket object
sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# AF_INET means IPv4, SOCK_STREAM means TCP
sk.bind((socket.gethostname(), 1125))

# enables a server to accept() connections
# maximum of 5 connect requests
sk.listen(5)
newStudent = True

while True:
    clientSocket, address = sk.accept()
    print(f'Kết nối theo địa chỉ {address} thành công')
    msg = 'Kết nối server thành công'
    clientSocket.send(bytes(msg, 'utf-8'))  # everything is in bytestream

    message_rcv = clientSocket.recv(1024)
    student_id = message_rcv.decode('utf-8')
    print(f'Sinh viên tìm kiếm: { student_id }')
    for student in student_list:
        print(student)
        if student['ID'] == str(student_id).strip():
            print('OK')
            msg = pickle.dumps(student)
            clientSocket.send(msg)
            break
        else:
            print('Not OK')
    clientSocket.close()
