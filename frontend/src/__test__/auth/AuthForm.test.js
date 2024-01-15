"use client";

import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "@/components/client/auth/AuthForm";
import ReduxProvider from "@/store/ReduxProvider";
import { loginSchema, registerSchema } from "@/validators/AuthValidator";

const mockDispatch = jest.fn();

beforeEach(() => {
  render(
    <ReduxProvider>
      <AuthForm
        authType="register"
        schema={registerSchema}
        dispatchAction={mockDispatch}
      />
    </ReduxProvider>
  );
});

describe("AuthFrom", () => {
  describe("Render", () => {
    test("should render the AuthForm component", () => {
      expect(screen.getByLabelText("auth-form")).toBeInTheDocument();
    });
    test("should render the username input", () => {
      expect(screen.getByLabelText("username")).toBeInTheDocument();
    });
    test("should render the password input", () => {
      expect(screen.getByLabelText("password")).toBeInTheDocument();
    });
    test("should render the Confirm Password input", () => {
      expect(screen.getByLabelText("confirm-password")).toBeInTheDocument();
    });
    test("should render the email input", () => {
      expect(screen.getByLabelText("email")).toBeInTheDocument();
    });
    test("should render the submit button", () => {
      expect(screen.getByLabelText("submit-button")).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    test("should be able to add input", async () => {
      const usernameInput = screen.getByLabelText("username");
      const passwordInput = screen.getByLabelText("password");
      const confirmPasswordInput = screen.getByLabelText("confirm-password");
      const emailInput = screen.getByLabelText("email");

      await userEvent.type(usernameInput, "username");
      await userEvent.type(passwordInput, "password");
      await userEvent.type(confirmPasswordInput, "password");
      await userEvent.type(emailInput, "tyler@gmail.com");

      expect(usernameInput).toHaveValue("username");
      expect(passwordInput).toHaveValue("password");
      expect(confirmPasswordInput).toHaveValue("password");
      expect(emailInput).toHaveValue("tyler@gmail.com");
    });
    test("should display error message on submit without values", async () => {
      const submitButton = screen.getByLabelText("submit-button");
      expect(screen.getByLabelText("username")).toBeInTheDocument();
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(
          screen.getAllByLabelText("error-message").length
        ).toBeGreaterThan(0);
      });
    });
    test("should display error message on submit with invalid email values", async () => {
      const submitButton = screen.getByLabelText("submit-button");
      const usernameInput = screen.getByLabelText("username");
      const passwordInput = screen.getByLabelText("password");
      const confirmPasswordInput = screen.getByLabelText("confirm-password");
      const emailInput = screen.getByLabelText("email");

      await userEvent.type(usernameInput, "username");
      await userEvent.type(passwordInput, "password");
      await userEvent.type(confirmPasswordInput, "password");
      await userEvent.type(emailInput, "tyler");

      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(
          screen.getAllByLabelText("error-message").length
        ).toBeGreaterThan(0);
      });
    });
    test("should display error message on submit if passwords don't match", async () => {
      const submitButton = screen.getByLabelText("submit-button");
      const usernameInput = screen.getByLabelText("username");
      const passwordInput = screen.getByLabelText("password");
      const confirmPasswordInput = screen.getByLabelText("confirm-password");
      const emailInput = screen.getByLabelText("email");

      await userEvent.type(usernameInput, "username");
      await userEvent.type(passwordInput, "pass");
      await userEvent.type(confirmPasswordInput, "password");
      await userEvent.type(emailInput, "tyler@email.com");

      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(
          screen.getAllByLabelText("error-message").length
        ).toBeGreaterThan(0);
      });
    });
    test("should submit the form", async () => {});
  });
});
