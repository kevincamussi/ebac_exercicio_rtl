import { fireEvent, render, screen } from "@testing-library/react";
import PostComments from "..";

describe("Testes para o componente PostComments", () => {
  test("Deve renderizar corretamente", () => {
    render(<PostComments />);
    expect(screen.getByText("Comentar")).toBeInTheDocument();
  });

  test("Deve adicionar o comentário", () => {
    render(<PostComments />);
    const comentario = screen.getByTestId("text-area");
    const botao = screen.getByTestId("btn-adicionar-comentario");

    fireEvent.change(comentario, { target: { value: "Teste" } });
    fireEvent.click(botao);
    fireEvent.change(comentario, { target: { value: "Teste 2" } });
    fireEvent.click(botao);

    expect(screen.getByText("Teste")).toBeInTheDocument();
    expect(screen.getByText("Teste 2")).toBeInTheDocument();
  });
});
