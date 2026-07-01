import React from "react";
import { render, screen } from "@testing-library/react";

import VoucherCategoryPage from "../VoucherCategoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders voucherCategory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VoucherCategoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("voucherCategory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("voucherCategory-add-button")).toBeInTheDocument();
});
