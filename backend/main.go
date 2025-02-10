package main

import (
	"backend/database"
	"backend/routing"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	err = database.SetupDB()
	if err != nil {
		log.Fatal(err)
	}

	port := ":8080"
	router := routing.GetServerRouter()

	if err := router.Run(port); err != nil {
		log.Fatal(err)
	}
}
