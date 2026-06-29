class Product:
    def __init__(self, name, description, price, category_id, brand, size, color, stock, image_url):
        self.name = name
        self.description = description
        self.price = price
        self.category_id = category_id
        self.brand = brand
        self.size = size
        self.color = color
        self.stock = stock
        self.image_url = image_url
    
    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category_id': self.category_id,
            'brand': self.brand,
            'size': self.size,
            'color': self.color,
            'stock': self.stock,
            'image_url': self.image_url
        }