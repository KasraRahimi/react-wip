package database

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

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

func GenerateToken(userId string, timeToExpireMinutes int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  userId,
		"ttl": time.Now().Add(time.Minute * time.Duration(timeToExpireMinutes)).Unix(),
	})

	secretKey := os.Getenv("SECRET_KEY")
	return token.SignedString([]byte(secretKey))
}

type TokenStruct struct {
	Id  string
	Ttl time.Time
}

var errInvalidToken = errors.New("invalid token")

func ParseToken(tokenString string) (TokenStruct, error) {
	var tokenStruct TokenStruct
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		return tokenStruct, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return tokenStruct, errInvalidToken
	}

	tokenStruct.Id, ok = claims["id"].(string)
	if !ok {
		return tokenStruct, errInvalidToken
	}

	ttlFloat, ok := claims["ttl"].(float64)
	if !ok {
		return tokenStruct, errInvalidToken
	}

	tokenStruct.Ttl = time.Unix(int64(ttlFloat), 0)

	return tokenStruct, nil
}
