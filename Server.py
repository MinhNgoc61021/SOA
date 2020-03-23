import socket
from StudentList import checkStudentExistence
import pickle

# creates a socket object
sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# AF_INET means IPv4, SOCK_STREAM means TCP
sk.bind((socket.gethostname(), 1125))

# enables a server to accept() connections
# maximum of 5 connect requests
sk.listen(5)

while True:
    clientSocket, address = sk.accept()
    print(f'Kết nối theo địa chỉ {address} thành công')
    msg = 'Kết nối server thành công'
    clientSocket.send(bytes(msg, 'utf-8'))  # everything is in bytestream
    search = True
    while True:
        message_rcv = clientSocket.recv(1024)
        searchContent = message_rcv.decode('utf-8')
        print(f'Tìm kiếm: {searchContent}')
        isExist = checkStudentExistence(searchContent)
        if isExist[1] is True:
            msg = pickle.dumps([isExist[0], {'status': 'Found!'}])
            clientSocket.send(msg)
            search = False
        else:
            clientSocket.send(pickle.dumps(['', {'status': 'Not found!'}]))
            search = False
    sk.close()
