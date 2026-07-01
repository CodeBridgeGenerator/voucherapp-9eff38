import React from "react";
import { render, screen } from "@testing-library/react";

import VoucherUsageCreateDialogComponent from "../VoucherUsageCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders voucherUsage create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VoucherUsageCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("voucherUsage-create-dialog-component")).toBeInTheDocument();
});
