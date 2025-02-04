package database

type User struct {
	Id           int
	Email        string
	Username     string
	PasswordHash string
}
