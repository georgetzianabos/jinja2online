import random

examples = [
    {
        'json': '{\n  "who": "Old lady",\n  "answer": "Wow I didn\'t know you could yodel"\n}',
        'template': "Knock knock\nWho's there?\n{{ who }}\n{{ who }} who ?\n{{ answer }}"
    }
]

def get_example():
    return random.choice(examples)