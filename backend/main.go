package main

import (
	"backend/routing"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := ":8080"
	server := &http.Server{
		Addr:    port,
		Handler: routing.GetServerMux(),
	}

	fmt.Printf("Server listening on %s\n", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}

}
