package routes

import "backend/database"

type ServerConfig struct {
	UserDao database.UserDAO
}
