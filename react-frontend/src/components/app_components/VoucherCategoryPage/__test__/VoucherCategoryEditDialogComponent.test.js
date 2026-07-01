import React from "react";
import { render, screen } from "@testing-library/react";

import VoucherCategoryEditDialogComponent from "../VoucherCategoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders voucherCategory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VoucherCategoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("voucherCategory-edit-dialog-component")).toBeInTheDocument();
});
