package routing

import (
	"backend/routing/routes"
	"net/http"
)

const API_URL = "/api"

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		next.ServeHTTP(w, r)
	})
}

func GetServerMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle(API_URL+"/auth/signup", corsMiddleware(&routes.SignUpHandler{}))
	mux.Handle(API_URL+"/auth/login", corsMiddleware(&routes.LoginHandler{}))
	return mux
}
