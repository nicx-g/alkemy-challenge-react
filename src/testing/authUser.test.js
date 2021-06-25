import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/react";
import Home from "../components/Home/Home";
import AuthProvider from "../context/authUser";
import HeroesProvider from "../context/heroes";
import renderWithRouter from "./renderWithRouter";

describe("authUser", () => {
    test("Usuario no autorizado es redirigido al login", () => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
            },
            writable: true,
        });
        const {history} = renderWithRouter(
            <AuthProvider>
                <HeroesProvider>
                    <Home />
                </HeroesProvider>
            </AuthProvider>
        );
        expect(history.location.pathname).toEqual('/login')
    });
    test("Usuario autorizado tiene permitido ver el contenido", async() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => {return {loginToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE"}}),
                setItem: jest.fn(() => null),
            },
            writable: true,
        });
        const component = renderWithRouter(
            <AuthProvider>
                <HeroesProvider>
                    <Home />
                </HeroesProvider>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(component.getAllByText('Mi equipo'))
        })
    });
});
