package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	user     = "kawa"
	password = "password"
	address  = "localhost:3306"
	dbname   = "lipu"
)

func GetDB() (*sql.DB, error) {
	dataSourceName := fmt.Sprintf("%s:%s@(%s)/%s", user, password, address, dbname)
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		return nil, err
	}
	return db, err
}

func CreateUserTable() error {
	db, err := GetDB()
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id				int PRIMARY KEY AUTO_INCREMENT,
			email 			VARCHAR(127) UNIQUE NOT NULL,
			username 		VARCHAR(31) UNIQUE NOT NULL,
			passwordHash	VARCHAR(127) UNIQUE NOT NULL
		)
	`)

	return err
}

func SetupDB() error {
	err := CreateUserTable()
	return err
}
