package routes

import (
	"backend/database"
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

	passwordHash, err := database.GeneratePasswordHash(data.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, "Could not generate password hash")
		return
	}

	userDAO := database.UserDAO{}
	newUser := database.User{
		Email:        data.Email,
		Username:     data.Username,
		PasswordHash: passwordHash,
	}

	err = userDAO.Create(newUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, "Could not create account")
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Successfully created the account")
}

func (h *SignUpHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		h.handlePost(w, r)
	default:
		fmt.Fprintf(w, "ERROR! %s %s", r.Method, r.URL)
	}
}
