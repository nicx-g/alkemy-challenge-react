import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "../components/Login/SignupForm/SignupForm";
import SearchBar from "../components/Global/SearchBar/SearchBar";
import AuthProvider from "../context/authUser";
import HeroesProvider from "../context/heroes";
import renderWithRouter from './renderWithRouter';

describe("SignupForm", () => {
    test("Renderizar inputs de Login", () => {
        render(
            <AuthProvider>
                <SignupForm />
            </AuthProvider>
        );

        const inputEmail = screen.getByLabelText("Email");
        const inputPassword = screen.getByLabelText("Contraseña");
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(inputEmail).toHaveAttribute("name", "email");
        expect(inputPassword).toHaveAttribute("name", "password");
    });

    test("Validar campos vacíos", async () => {
        render(
            <AuthProvider>
                <SignupForm />
            </AuthProvider>
        );

        const button = screen.getByText("Enviar");
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getAllByText("Requerido"));
            expect(button).toBeDisabled();
        });
    });

    test("Validar Email", async () => {
        render(
            <AuthProvider>
                <SignupForm />
            </AuthProvider>
        );

        const button = screen.getByText("Enviar");
        const inputEmail = screen.getByLabelText("Email");
        userEvent.type(inputEmail, "alkemy");
        fireEvent.click(button);
        await waitFor(() => {
            expect(button).toBeDisabled();
            expect(screen.getByText("Ingresá una dirección de email válida"));
        });
    });

    test("Validar credenciales correctas", async () => {
        render(
            <AuthProvider>
                <SignupForm />
            </AuthProvider>
        );
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
            },
            writable: true,
        });

        const button = screen.getByText("Enviar");
        const inputEmail = screen.getByLabelText("Email");
        const inputPassword = screen.getByLabelText("Contraseña");
        userEvent.type(inputEmail, "chage@alkemy.org");
        userEvent.type(inputPassword, "contraseñaincorrecta");
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByRole("alert"));
            expect(window.localStorage.setItem).not.toHaveBeenCalled()
        });
    });

    test("Recibir token al loguear", async() => {
        render(
            <AuthProvider>
                <SignupForm />
            </AuthProvider>
        );
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: jest.fn(() => null),
              setItem: jest.fn(() => null)
            },
            writable: true
          });

        const button = screen.getByText("Enviar");
        const inputEmail = screen.getByLabelText("Email");
        const inputPassword = screen.getByLabelText("Contraseña");
        userEvent.type(inputEmail, "challenge@alkemy.org");
        userEvent.type(inputPassword, "react");
        fireEvent.click(button);

        await waitFor(() => {
            expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
        })
    });
});

describe("SearchBar", () => {
    test("render SearchBar", () => {
        render(
            <AuthProvider>
                <HeroesProvider>
                    <SearchBar />
                </HeroesProvider>
            </AuthProvider>
        );

        const button = screen.getByText("Buscar");
        const input = screen.getByPlaceholderText(
            "Busca tus héroes favoritos. Ej: Flash"
        );
        expect(button).toBeInTheDocument;
        expect(input).toBeInTheDocument;
    });
    test("Validar campo vacío", async () => {
        render(
            <AuthProvider>
                <HeroesProvider>
                    <SearchBar />
                </HeroesProvider>
            </AuthProvider>
        );

        const button = screen.getByText("Buscar");
        fireEvent.click(button);
        await waitFor(() => {
            expect(button).toBeDisabled;
        });
    });
    test("Validar funcionamiento", async () => {
        const { history } = renderWithRouter(<SearchBar />);
        const button = screen.getByText("Buscar");
        const input = screen.getByPlaceholderText(
            "Busca tus héroes favoritos. Ej: Flash"
        );
        userEvent.type(input, "flash");
        fireEvent.click(button);
        await waitFor(() => {
            expect(history.location.pathname).toEqual("/search/flash");
        })
    });
});
