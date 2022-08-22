# This file MUST be configured in order for the code to run properly

# Make sure you put all your input images into an 'assets' folder. 
# Each layer (or category) of images must be put in a folder of its own.

# CONFIG is an array of objects where each object represents a layer
# THESE LAYERS MUST BE ORDERED.

# Each layer needs to specify the following
# 1. id: A number representing a particular layer
# 2. name: The name of the layer. Does not necessarily have to be the same as the directory name containing the layer images.
# 3. directory: The folder inside assets that contain traits for the particular layer
# 4. required: If the particular layer is required (True) or optional (False). The first layer must always be set to true.
# 5. rarity_weights: Denotes the rarity distribution of traits. It can take on three types of values.
#       - None: This makes all the traits defined in the layer equally rare (or common)
#       - "random": Assigns rarity weights at random. 
#       - array: An array of numbers where each number represents a weight. 
#                If required is True, this array must be equal to the number of images in the layer directory. The first number is  the weight of the first image (in alphabetical order) and so on...
#                If required is False, this array must be equal to one plus the number of images in the layer directory. The first number is the weight of having no image at all for this layer. The second number is the weight of the first image and so on...

# Be sure to check out the tutorial in the README for more details.                

CONFIG = [
    {
        'id': 1,
        'name': 'Background',
        'directory': 'Background',
        'required': True,
        'rarity_weights': [2,2,2,10,1,10,10,2,1,10,10,10,2,2,10,10,10,10,10,2,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
    },
    {
        'id': 2,
        'name': 'Body',
        'directory': 'Body',
        'required': True,
        'rarity_weights': [10,3,5,5,3,10,10,10,10,2,2,10,2,2,2,5,10,10,10,10,10,10,2,3,10,10,10,10,0.5,3,5,10,10,3,10,10,2,5,10,10,10,10,10,5],
    },
    {
        'id': 3,
        'name': 'Eyes',
        'directory': 'Eyes',
        'required': True,
        'rarity_weights': [7,0.5,2,2,1,7,5,7,10,8,0.5,8,2,1,8,1,2,7],
    },
    {
        'id': 4,
        'name': 'Mouth',
        'directory': 'Mouth',
        'required': True,
        'rarity_weights': None,
    },
        {
        'id': 5,
        'name': 'Shirt',
        'directory': 'Shirt',
        'required': False,
        'rarity_weights': [120,1,5,5,5,5,5,5,2,5,5,5,5,5,1,1,5,5,1,5,5,5,5,1,5,5,5,5,5],
    },
    {
        'id': 6,
        'name': 'Hat',
        'directory': 'Hat',
        'required': False,
        'rarity_weights': [100,1,2,1,5,5,5,5,5,5],
    },
        {
        'id': 7,
        'name': 'Pants',
        'directory': 'Pants',
        'required': True,
        'rarity_weights': [10,10,10,10,2,2,2,10],
    },
    {
        'id': 8,
        'name': 'Chain',
        'directory': 'Chain',
        'required': False,
        'rarity_weights': [200,5,5,5,5,2,5,5,5,2,5,1,5,5],
    },
]
