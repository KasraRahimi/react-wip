package routing

import "net/http"

func GetServerMux() *http.ServeMux {
	mux := http.NewServeMux()
	return mux
}
