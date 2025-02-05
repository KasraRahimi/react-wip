package database

import "golang.org/x/crypto/bcrypt"

func GeneratePasswordHash(password string) (string, error) {
	hashBytes, err := bcrypt.GenerateFromPassword([]byte(password), 15)
	if err != nil {
		return "", err
	}
	return string(hashBytes), err
}

func IsPasswordAndHashSame(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
