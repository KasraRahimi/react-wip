package routes

import (
	"fmt"
	"net/http"
)

type SignUpHandler struct{}

func (h *SignUpHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s %s", r.Method, r.URL)
}
