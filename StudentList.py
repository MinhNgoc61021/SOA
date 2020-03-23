student_list = [
    {
        'ID': '17021300',
        'Name': 'Nguyễn Ngọc Minh',
        'Course': 'K62-CACLC2',
        'Phone number': '0969535735',
        'Email': '17021300@vnu.edu.vn',
        'Address': 'Hanoi, Vietnam'
    },
    {
        'ID': '17021304',
        'Name': 'Nguyễn Nam',
        'Course': 'K62-CACLC2',
        'Phone number': '0969535735',
        'Email': '17021300@vnu.edu.vn',
        'Address': 'Hanoi, Vietnam'
    },
    {
        'ID': '17021306',
        'Name': 'Phạm Công Nam',
        'Course': 'K62-CACLC2',
        'Phone number': '0969535735',
        'Email': '17021302@vnu.edu.vn',
        'Address': 'Hanoi, Vietnam'
    }
]


def checkStudentExistence(ID):
    for student in student_list:
        if str(ID).strip() == student['ID']:
            return student, True
    return {}, False
