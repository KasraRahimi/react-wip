package routing

import (
	"backend/routing/routes"
	"net/http"
)

const API_URL = "/api"

func GetServerMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle(API_URL+"/auth/signup", &routes.SignUpHandler{})
	return mux
}
