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

func (u *UserDAO) ReadByUsername(username string) (User, error) {
	var user User
	db, err := GetDB()
	if err != nil {
		return user, err
	}
	defer db.Close()

	err = db.QueryRow(`SELECT * FROM users WHERE username=?`, username).Scan(&user.Id, &user.Email, &user.Username, &user.PasswordHash)
	return user, err
}

func (u *UserDAO) ReadByEmail(email string) (User, error) {
	var user User
	db, err := GetDB()
	if err != nil {
		return user, err
	}
	defer db.Close()

	err = db.QueryRow(`SELECT * FROM users WHERE email=?`, email).Scan(&user.Id, &user.Email, &user.Username, &user.PasswordHash)
	return user, err
}

func (u *UserDAO) ReadById(id int) (User, error) {
	var user User
	db, err := GetDB()
	if err != nil {
		return user, err
	}
	defer db.Close()

	err = db.QueryRow(`SELECT * FROM users WHERE id=?`, id).Scan(&user.Id, &user.Email, &user.Username, &user.PasswordHash)
	return user, err
}
