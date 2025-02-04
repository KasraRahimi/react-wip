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
