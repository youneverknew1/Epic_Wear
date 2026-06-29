class User:
    def __init__(self, name, email, password, phone=None, address=None, role='customer'):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.role = role
    
    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'role': self.role
        }