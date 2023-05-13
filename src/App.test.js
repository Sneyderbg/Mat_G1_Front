import App from "./App";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock("axios");

const response = {
  data: {
    'user': 1,
  }
};

axios.post.mockResolvedValueOnce(response);
axios.get.mockResolvedValueOnce([]);
window.axios = axios;

test("renders learn react link", () => {
  render(<App />);

  const linkElement = screen.getByText('Proceso de matrícula');
  expect(linkElement).toBeInTheDocument();
});
