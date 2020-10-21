from cryptography.fernet import Fernet


class SecretUtility(object):

    def load_key(self):
        with open("secret.txt","rb") as secret_file:
            key = secret_file.read()
        return key


    def encrypt_message(self,message):
        key = self.load_key()
        encoded_message = message.encode()
        f = Fernet(key)
        encrypted_message = f.encrypt(encoded_message)
        return encrypted_message


    def decrypt_message(self,encrypted_message):
        key = self.load_key()
        f = Fernet(key)
        decrypted_message = f.decrypt(encrypted_message)
        return decrypted_message