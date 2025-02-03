package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type signUpJson struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignUpHandler struct{}

func (h *SignUpHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	var data signUpJson
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, "Invalid json format")
		return
	}

	fmt.Fprintf(w, "email: %s\nusername: %s\npassword: %s\n", data.Email, data.Username, data.Password)
}

func (h *SignUpHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		h.handlePost(w, r)
	default:
		fmt.Fprintf(w, "ERROR! %s %s", r.Method, r.URL)
	}
}
