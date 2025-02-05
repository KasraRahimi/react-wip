package database

type UserDAO struct{}

func (u *UserDAO) Create(user User) error {
	db, err := GetDB()
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec(`
	INSERT INTO users (email, username, passwordHash)
	VALUES (?, ?, ?)
	`, user.Email, user.Username, user.PasswordHash)

	return err
}
